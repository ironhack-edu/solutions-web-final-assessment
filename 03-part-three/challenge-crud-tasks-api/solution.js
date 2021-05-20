/****************************************************/
const express = require('express');                 //
const bodyParser = require('body-parser');          //
                                                    //
const app = express();                              //
mongoose.connect(MONGODB_URL)                       //
  .then(()=> console.log('connected'))              //
  .catch((err)=> console.log(err))                  //
                                                    //
app.use(bodyParser.json());                         //
app.listen(3000);                                   //
/****************************************************/
/* Environment setup. Do not modify the above code. */ 


// MODELS
// `Task` model:
const Task = mongoose.model('Task', new mongoose.Schema({ title: String, details: String }));

// `User` model:
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  name: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}));



// ROUTES
// USERS
// POST /users
app.post('/users', (req, res) => {
  const { email, name } = req.body;
  
  User.create({ email, name, tasks: [] })
    .then(user => res.json({ data: user }))
    .catch(error => console.log(error));
});


// GET /users/:userId
app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  User.findById( userId )
    .populate('tasks')
    .then(user => res.json({ data: user }))
    .catch(error => console.log(error))
});


// TASKS
// 3.1
// POST /tasks
app.post('/tasks', (req, res) => {
  const { title, details, userId } = req.body;
  
  Task.create({ title, details })
    .then(newTask => {
      User.findOneAndUpdate({ _id: userId }, { $push: { tasks: newTask._id } }, { new: true })
        .then(updatedUser => res.json({ data: newTask }))
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});




// 3.2
// GET /tasks/:taskId
app.get('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  Task.findById(taskId)
    .then(task => res.json({ data: task }))
    .catch(error => console.log(error))
});



// 3.3
// PUT /tasks/:taskId
app.put('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  const { title, details } = req.body;  
  
  Task.findOneAndUpdate({ _id: taskId }, { title, details }, { new: true })
    .then(task => res.json({ data: task }))
    .catch(error => console.log(error))
});


// 3.4
// DELETE /tasks/:taskId
app.delete('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  
  Task.findOneAndRemove({ _id: taskId })
    .then(result => {
      User.findOneAndUpdate({ tasks: taskId }, { $pull: { tasks: taskId } }, { new: true })
        .then(updatedUser => res.sendStatus(204))
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});