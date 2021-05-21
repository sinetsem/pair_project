const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get('/', (req, res) => res.send("Hello Project"))

let users = [
    {username: "sinet", password : "123", color: "pink", text: "Hello everyone!"},
    {username: "chanry", password : "456", color: "blue", text: "hello! how are you?"},

]

app.get('/users', (req , res) =>{
    res.send(users);
})

app.post('/users', (req, res) =>{
    
    let user = {text:req.body.text};
    users.push(user);
    res.send(users);


})