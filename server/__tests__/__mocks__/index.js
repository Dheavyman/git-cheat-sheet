const users = [{
  username: 'anonymous',
  password: 'password234',
  role: 'admin',
}, {
  username: 'anonymous1',
  password: 'password234',
}, {
  username: 'anonymous2',
  password: 'password234',
}];

const unknownUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmY5Y2I2ZjM2OGE0N2RiOGQzZDE4OTIiLCJpYXQiOjE1NDMwOTcxOTksImV4cCI6MTU0MzE4MzU5OX0.yvvGq-EWjZ-a71HSgpHO0_TNwnq6Igfa81ztaO_bxAM';

const cheats = [{
  category: "Make changes",
	description: "Check the changes made",
  command: "git status",
  keywords: [],
}, {
  category: "Make changes",
	description: "Move a file with changes made to staging area",
	command: "git add [file]"
}, {
	description: "Move a file with changes made to staging area",
	command: "git add [file]"
}, {
  category: "Make changes",
	command: "git add [file]"
}, {
  category: "Make changes",
	description: "Move a file with changes made to staging area",
}];

const createUser = (Model, jwt, isAdmin = false, index = 1) => {
  const userData = isAdmin ? users[0] : users[index]
  const user = new Model(userData);

  return new Promise((resolve, reject) => {
    user.save((err, newUser) => {
      const token = jwt.sign({
        userId: newUser._id
      }, process.env.JWT_SECRET, {
        expiresIn: 60,
      })

      resolve({ newUser, token})
    });
  });
};

const createCheat = (Model, index = 0) => {
  const cheat = new Model(cheats[index]);

  return new Promise((resolve, reject) => {
    cheat.save((err, newCheat) => resolve(newCheat));
  });
};

export { users, unknownUserToken, cheats, createUser, createCheat };
