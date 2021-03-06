const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express(); 
const path = require('path')
app.use(cors());


app.use(express.json())
mongoose.connect('mongodb+srv://yasmin123:yasmin123@todolist.nniow.mongodb.net/todoList?retryWrites=true&w=majority', 
    { useNewUrlParser: true }
)
.then(() => console.log('Mogodb connected'))
.catch(err => console.log('Err', err))


      
const Todo = require('./models/Todo')

app.get('/todo/get', (req, res) => {
    Todo.find()
    .then(todos => res.send(todos))
    .catch(err => console.log(err))
})



app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});


app.post('/todo/add', (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    })

    newTodo.save().then(todo => res.redirect('/'))
})

// app.get('/todo/delete/:id', (req, res) => {
//     const id = req.params.id;
//     res.send(id)
// })

app.delete('/todo/delete/:text', (req, res) => {
    const text = req.params.text
    console.log(text, 'text');
    Todo.find({text: text}).then(todo => {
        console.log(todo, 'tooooodooooo');
        Todo.remove(todo[0]).then(() => res.send('removed')).catch(err => {
            console.log('Err in removing', err);
            res.send('err in removing todo')
        })
    }).catch(err => console.log('Err in finding todo', err))
})


const PORT = process.env.PORT || 4000




// app.get('/', (req, res) => {
//     res.send(`home route works`)
// })

app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`);
})