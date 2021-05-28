
let fs=require("fs");
const express = require('express');

const app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));



let users = [
    {username: "sinet", password : "123", color: "pink", text: "Hello everyone!", time: "5/19/2021-10:00AM",bold: "", italic:"", id: 1},
    {username: "chanry", password : "456", color: "cyan", text: "hello! how are you?", time: "5/19/2021-10:01AM", bold: "", italic:"", id: 2},

]



app.get('/users', (req , res) =>{
  
    users= JSON.parse(fs.readFileSync("data.json"));
    res.send(users);
})

app.post('/users', (req, res) =>{
    
    let id= users.length+1;
    let userlist = req.body;
    userlist.id = id;
    users.push(userlist);
    fs.writeFileSync("data.json" ,JSON.stringify(users));
    res.send(users);
  

});

app.delete("/users/:id", (req,res) =>{
    
    let id = req.params.id;
    
    for (let index in users){
        let userId = users[index].id;
        if (userId === parseInt(id)){
            users.splice(index,1);
            fs.writeFileSync("data.json" ,JSON.stringify(users));
            res.send(users);
        }
    }
   
});

app.put("/users/:id", (req , res) => {
    let id = req.params.id;
    let text = req.body.text;
 
    for (let index in users){
        let userId = users[index].id;
        if (userId === parseInt(id)){
            users[index].text = text;
            fs.writeFileSync("data.json" ,JSON.stringify(users));
            res.send(users);
        }
    }

})





