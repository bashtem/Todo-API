const express = require('express');
const router = express.Router();
const Todo = require("../models/TodoModel");


let responseMsg = (status, message) => ({status: status, message: message});


// Create Todo
router.post('/create', (req, res) => {

    const newTodo = {
        todo_name: req.body.todo_name,
        status: req.body.status,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        description: req.body.description,   
        priority: req.body.priority
    };

    const todo = new Todo(newTodo);

    todo.save()
        .then(() => res.status(201).json(responseMsg(201, `${req.body.todo_name} Todo Created`)))
        .catch((err) => res.status(400).json(responseMsg(400, err.message)));
    
});


// Get List of Todos
router.get('/fetch', async (req, res) => {
    
    let todoCollection = await Todo.find().select(["todo_name", "priority"]);

    res.status(200).json({
        status : 200,
        data: todoCollection
    });

});


// Get a specific Todo
router.get('/get/:id', async (req, res) => {

    let todoId = req.params.id;

    let todo = await Todo.findById(todoId);

    res.status(200).json({
        status : 200,
        data: todo
    });
    
});


// Search for a Todo
router.post('/search', async (req, res) => {
    
    let todoName = req.body.todo_name;

    let priority = req.body.priority;

    let todoResult = await Todo.find({todo_name: todoName, priority: priority});

    res.status(200).json({
        status: 200,
        data: todoResult
    })

});


// Edit a Todo
router.post('/edit/:id',  (req, res) => {

    let todoId = req.params.id;

    Todo.updateOne({_id: todoId}, {

        todo_name: req.body.todo_name,
        status: req.body.status,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        description: req.body.description,   
        priority: req.body.priority
    })
        .then(() => res.status(200).json(responseMsg(200, "Todo Updated")))
        .catch((err) => res.status(400).json(responseMsg(400, "Bad Request")));    
});


// Delete a Todo
router.delete('/delete/:id', (req, res) => {

    let todoId = req.params.id;

    Todo.remove({_id: todoId})
        .then(() => res.status(200).json(responseMsg(200, "Todo Deleted")) )
        .catch((err) => res.status(200).json(responseMsg(200, "Todo id does not Exist ")))
});


module.exports = router;