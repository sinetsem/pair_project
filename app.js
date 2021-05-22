const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get('/', (req, res) => res.send("Hello Project"))

let users = [
    {id: 1,username: "sinet", password : "123", color: "pink", text: "Hello everyone!"},
    {id:2,username: "chanry", password : "456", color: "blue", text: "hello! how are you?"},

]

app.get('/users', (req , res) =>{
    res.send(users);
})

app.post('/users', (req, res) =>{
    let username = req.body.username;
    let text = req.body.text;
    let color = req.body.color;
    let password = req.body.password;
    let id= users.length+1;
   
    let userlist = {id:id,username:username ,password: password,text:text, color: color};
    users.push(userlist);
    res.send(users);

})
