const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get('/', (req, res) => res.send("Hello Project"))

let users = [
    {id: 1,username: "sinet", password : "123", color: "pink", text: "Hello everyone!", bold: "", italic:""},
    {id:2,username: "chanry", password : "456", color: "cyan", text: "hello! how are you?",bold: "", italic:""},

]

app.get('/users', (req , res) =>{
    res.send(users);
})

app.post('/users', (req, res) =>{
    let username =req.body.username;
    let text = req.body.text;
    let color = req.body.color;
    let password = req.body.password;
    let id= users.length+1;
    let bold = req.body.bold;
    let italic = req.body.italic;
    
   
    let userlist = {id,username ,password,text, color,bold, italic};
   
    users.push(userlist);
    res.send(users);

})
