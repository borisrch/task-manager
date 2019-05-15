const express = require('express');
require('./db/mongoose');
const User = require('./db/models/user');

const app = express();
const port = process.env.PORT || 3000;

// automatically parse requests as json
app.use(express.json())

app.post('/users', (req, res) => {
  const user = new User(req.body);
  
  user.save().then(() => {
    res.send(user);
  }).catch((error) => {
    res.status(400);
    res.send(error);
  });
});

app.listen(port, () => {
  console.log('Server is up and running on port ', port);
});