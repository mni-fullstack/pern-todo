const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// Routes

//Create to do
app.post('/todo/createNew', async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("insert into todo (description) values($1)",
        [description]);

        console.log(req.body);
        res.json(newTodo.rows[0]); 
    }catch(err) {
        console.log(err.message);
    }
});

app.get('/todo/getTodos', async (req, res) =>{
    const allTodos = await pool.query("select * from todo");
    res.json(allTodos.rows) 
});

app.get('/todo/getTodoById/:id', async (req, res) =>{
    const {id} = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [id]);
    res.json(todo.rows[0])  
});

app.put("/todo/updateTodoById/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("Update todo set description = $1 where todo_id = $2", [description, id]);
        res.json("todo was updated");
    } catch (error) {
        console.log(err.message);
    }
    
});

app.delete("/todo/deleteTodoById/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("delete from todo where todo_id = $1", [id]);
        res.json("todo was delete");
    } catch (error) {
        console.log(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
});