//......................display user on broswer.................................//
function displayUser(response){
    let users = response.data;
    const text = document.querySelector("#textId");
    let content = document.querySelector(".content");
    const user_list = document.querySelector(".user-list");
    
    if (user_list!==null){
        user_list.remove();
    }
    const new_user_list = document.createElement("div");
    new_user_list.classList.add("user-list");
    for (let user of users){

        //...............create element fieldset for store all spans..................//
        const fieldset = document.createElement("fieldset");
        

        //..............create element span for contain name and text message..........//
        const span_text =document.createElement("span");
      
        span_text.textContent = user.username + ": " + user.text;

        //.............create element span for contain icon eidt...................//
        const span_edit = document.createElement("span");
        span_edit.className ="edit fa fa-pencil-square-o hvr-grow";

        //..............create element span for contain icon delete................//
        const span_delete = document.createElement('span');
        span_delete.className = "delete fa fa-trash hvr-grow";

        //.............create element span for contain icon quote.................//
        const span_quote = document.createElement('span');
        span_quote.className = "quote-left fa fa-quote-left hvr-grow";

        //................append all spans into the fieldset................//
        fieldset.appendChild(span_text);
        fieldset.appendChild(span_edit);
        fieldset.appendChild(span_delete);
        fieldset.appendChild(span_quote);
        fieldset.style.backgroundColor = user.color;
        new_user_list.appendChild(fieldset);
        content.appendChild(new_user_list);
    }

    //.................clear value from text message.....................//
    text.value = "";

}

// .....................function show and hide element .........................//
function showElement(element,isShow){
    if (isShow){
      element.style.display="block";
    }
    else{
      element.style.display="none";
    }
}

//............function show and hide element when click on button Login ....................//
function buttonLogin(event){
    event.preventDefault();
    showElement(btnsubmit,false)
    showElement(userLoginDiv,true);
    showElement(colorId,false);
    showElement(containerDiv,false);
    showElement(bg, false);
    showElement(register,false);
};

//..............function show and hide element when click on button SingUp...................//
function buttonSignUp(event){
    event.preventDefault();
    showElement(saveBtn,false);
    showElement(userLoginDiv,true);
    showElement(colorId,true);
    showElement(containerDiv,false);
    showElement(bg, false);
    showElement(user_login,false);
};

//................function ask user can login or not...................//
function Userlogin(response){
    let users = response.data;

    //...............get value from input....................//
    const input_username= document.querySelector("#username").value;
    const input_password = document.querySelector("#password").value;
    
    let count = 0;
    
    for (let user of users){
        if (user.username === input_username && user.password === input_password){

            //..........show and hide element................//
            showElement(containerDiv,true);
            showElement(userLoginDiv,false);
            showElement(bg, false)
            count +=1;
            //................add value into object............//
            User.username = user.username;
            User.password= user.password;
            User.color = user.color;  

        }
    }
    if (count===0){
        confirm("wrong password or username!!")
    }
}

//.............function save user login...............//
function buttonSave(e){
    e.preventDefault();
    // const url = "http://localhost:5000/users";
    const url = "https://free-9chat.herokuapp.com/users";
    axios.get(url).then(Userlogin);
    
    
};


//..............function for user register................//
function UserRegister(response){
    let users = response.data;

    //...............get value from input....................//
    const input_username= document.querySelector("#username").value;
    const input_password = document.querySelector("#password").value;
    const input_color = document.querySelector("#color").value;

    //............alert message when input empty...................//
    if (input_username==="") return confirm("input username cannot empty!!")
    if (input_password==="") return confirm("input password cannot empty!!")

    //..........show and hide element................//
    showElement(containerDiv,true);
    showElement(userLoginDiv,false);
    showElement(bg, false)

    //..........add value into object...............//
    User.username = input_username;
    User.password = input_password;
    User.color = input_color;
}

//...........function submit form register................//
function BtnSubmit(e){
    e.preventDefault();
    // const url = "http://localhost:5000/users";
    const url = "https://free-9chat.herokuapp.com/users";
    axios.get(url).then(UserRegister);

}


//.......................send message........................//
function sendMessage(e){
    const text = document.querySelector("#textId").value;
    
    User.text = text;
    // const url = "http://localhost:5000/users";
    const url = "https://free-9chat.herokuapp.com/users";
    axios.post(url, User).then(displayUser);


}

//.......................load data.............................//
function loadData(){
    // const url = "http://localhost:5000/users";
    const url = "https://free-9chat.herokuapp.com/users";
    axios.get(url).then(displayUser);
}

//.........create empty object for store all value.................//
let User = {};


const containerDiv=document.querySelector(".container");
const userLoginDiv=document.querySelector(".userLogin");
const colorId=document.querySelector("#color");
const bg = document.querySelector(".bg");
const register = document.querySelector(".register");
const user_login = document.querySelector(".user_login");

//...............button show and hide element..................//
const loginBtn=document.querySelector(".login");
loginBtn.addEventListener("click",buttonLogin);

//...............button show and hide element..................//
const signUpBtn=document.querySelector(".sign_up");
signUpBtn.addEventListener("click",buttonSignUp);

//...............button save user login......................//
const saveBtn=document.querySelector("#save");
saveBtn.addEventListener("click",buttonSave);

//...............button submit form register.................//
const btnsubmit = document.querySelector("#submit");
btnsubmit.addEventListener("click", BtnSubmit);


//...............button send message.........................//
const btnsend = document.querySelector("#send_message");
btnsend.addEventListener('click', sendMessage);


loadData();
