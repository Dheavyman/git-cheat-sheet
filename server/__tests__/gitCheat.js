import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import app from '../';
import GitCheat from '../models/gitCheat';
import User from '../models/user';
import { unknownUserToken, cheats, createUser, createCheat } from './__mocks__';

const server = supertest.agent(app);
const expect = chai.expect;

describe('Git cheat endpoint', () => {
  before(done => {
    mongoose.connect(process.env.DB_TEST_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    const dbConnection = mongoose.connection;

    dbConnection.once('open', () => {
      console.log('Connected to test database!');
      done();
    });
    dbConnection.on('error', console.error.bind(console, 'connection error'));
  });
  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('Database connection closed');
    });
  });

  describe('Add cheat', () => {
    let adminUser;
    let newUser;
    before(async () => {
      adminUser = await createUser(User, jwt, true);
      newUser = await createUser(User, jwt, false, 1);
    });

    after((done) => {
      GitCheat.deleteMany({}, (err) => {
        User.deleteMany({}, (err) => {
          done();
        });
      });
    });
    it('should return error if no token is provided', (done) => {
      server.post('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(cheats[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('No token provided')
          done();
        });
    });

    it('should return error if an invalid token is provided', (done) => {
      server.post('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('x-access-token', 'invalid-token')
        .send(cheats[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid token')
          done();
        });
    });

    it('should return error if a valid token from unknown user is provided', (done) => {
      server.post('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('x-access-token', unknownUserToken)
        .send(cheats[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('User not found')
          done();
        });
    });

    it('should not allow a non admin user add a cheat', (done) => {
      server.post('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('x-access-token', newUser.token)
        .send(cheats[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Unauthorized access')
          done();
        });
    });

    it('should allow an admin user add a cheat', (done) => {
      server.post('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('x-access-token', adminUser.token)
        .send(cheats[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Git cheat created');
          expect(res.body.data.cheat.category).to.equal(cheats[0].category);
          expect(res.body.data.cheat.description).to.equal(cheats[0].description);
          expect(res.body.data.cheat.command).to.equal(cheats[0].command);
          expect(res.body.data.cheat.keywords).to.be.an('array').with.length(0);
          done();
        });
    });

    it('should return error if category is not provided', (done) => {
      server.post('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('x-access-token', adminUser.token)
        .send(cheats[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Input `category` is required')
          done();
        });
    });

    it('should return error if description is not provided', (done) => {
      server.post('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('x-access-token', adminUser.token)
        .send(cheats[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Input `description` is required')
          done();
        });
    });

    it('should return error if command is not provided', (done) => {
      server.post('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('x-access-token', adminUser.token)
        .send(cheats[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Input `command` is required')
          done();
        });
    });
  });

  describe('Get all cheats', () => {
    let user;

    before(async () => {
      user = await createUser(User, jwt, false, 2);
      await createCheat(GitCheat, 0);
      await createCheat(GitCheat, 1);
    });

    after((done) => {
      GitCheat.deleteMany({}, (err) => {
        User.deleteMany({}, (err) => {
          done();
        });
      });
    });

    it('should return an error for unauthenticated user', done => {
      server.get('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', unknownUserToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('should get all cheats for authenticated user', done => {
      server.get('/api/v1/cheats')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Cheats fetched');
          expect(res.body.data.cheats).to.be.an('array').with.length(2);
          done();
        });
    });
  });
});
