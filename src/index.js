const express = require('express');
require('./db/mongoose');

const User = require('./db/models/user');
const Task = require('./db/models/task');

const app = express();
const port = process.env.PORT || 3000;

// automatically parse requests as json
app.use(express.json())

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
      res.status(500).send(e);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await Users.find({});
  } catch (e) {
    res.status(500).send();
  }
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task.save().then(() => {
    res.status(201).send(task);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks);
  }).catch((error) => {
    res.status(500).send();
  });
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  
  Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  }).catch((error) => {
      res.status(500).send();
    }
  );
})

app.listen(port, () => {
  console.log('Server is up and running on port ', port);
});