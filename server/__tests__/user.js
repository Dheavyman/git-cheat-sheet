import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';

import app from '../';

const server = supertest.agent(app);
const expect = chai.expect;

describe('User authentication endpoint', () => {
  before(done => {
    mongoose.connect(process.env.DB_TEST_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    const dbConnection = mongoose.connection;

    dbConnection.on('error', console.error.bind(console, 'connection error'));
    dbConnection.once('open', () => {
      console.log('Connected to test database!');
      done();
    });
  });
  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('Database connection closed');
    });
  });
  describe('Register user', () => {
    it('should return error for invalid username input', (done) => {
      server.post('/api/v1/auth/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ username: '#notAcceptable#', password: 'password'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Username must contain only alphanumeric characters, period and underscore');
          done();
        });
    });

    it('should return error for invalid password input', (done) => {
      server.post('/api/v1/auth/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ username: 'acceptable', password: 'pass'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Password must contain at least 8 characters');
          done();
        });
    });

    it('should return register a user successfully', (done) => {
      server.post('/api/v1/auth/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ username: 'acceptable', password: 'password'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('User created');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });

    it('should return error for an already existing username', (done) => {
      server.post('/api/v1/auth/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ username: 'acceptable', password: 'password1'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Username already exist');
          done();
        });
    });
  });

  describe('Login user', () => {
    it('should return error for invalid username', (done) => {
      server.post('/api/v1/auth/login')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ username: 'wrongUsername', password: 'password'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Username or password incorrect');
          done();
        });
    });

    it('should return error for invalid password', (done) => {
      server.post('/api/v1/auth/login')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ username: 'acceptable', password: 'wrongPassword'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Username or password incorrect');
          done();
        });
    });

    it('should login a valid user and return a token', (done) => {
      server.post('/api/v1/auth/login')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ username: 'acceptable', password: 'password'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('User logged in');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });
  });
});
