//......................display user on broswer.................................//
function displayUser(response) {
    let users = response.data;
    
    let content = document.querySelector(".content");
    const user_list = document.querySelector(".user-list");
   
    if (user_list !== null) {
        user_list.remove();
    }
    const new_user_list = document.createElement("div");
    new_user_list.classList.add("user-list");
    for (let user of users) {
      

        //...............create element fieldset for store all spans..................//
        const fieldset = document.createElement("fieldset");


        //..............create element span for contain name and text message..........//
        const span_text = document.createElement("span");
        if (user.bold === "B" && user.italic === "I") {
            
            span_text.textContent = user.username + ": " + user.text;
            span_text.style.fontWeight = "bold";
            span_text.style.fontStyle = "italic";

        }
        else if (user.bold === "B") {
            
            span_text.textContent = user.username + ": " + user.text;
            span_text.style.fontWeight = "bold";

        }
        else if (user.italic === "I") {
            
            span_text.textContent = user.username + ": " + user.text;
            span_text.style.fontStyle = "italic";

        }
        else {
            span_text.textContent = user.username + ": " + user.text;
        }
       

        //.............create element span for contain icon eidt...................//
        const span_edit = document.createElement("span");
        span_edit.className = "fa fa-pencil-square-o ";

        //..............create element span for contain icon delete................//
        const span_delete = document.createElement('span');
        span_delete.className = "fa fa-trash ";
        

        //.............create element span for contain icon quote.................//
        const span_quote = document.createElement('span');
        span_quote.className = "fa fa-quote-left ";

        //................append all spans into the fieldset................//
        fieldset.appendChild(span_text);
        fieldset.appendChild(span_edit);
        fieldset.appendChild(span_delete);
        fieldset.appendChild(span_quote);
        fieldset.style.backgroundColor = user.color;
        new_user_list.appendChild(fieldset);
        content.appendChild(new_user_list);
       

    }

    //.................clear value .....................//
    
    bold = "";
    italic = "";


}


// .....................show and hide element .........................//
const containerDiv = document.querySelector(".container");
const userLoginDiv = document.querySelector(".userLogin");
const colorId = document.querySelector("#color");
const register = document.querySelector(".register");
const user_login = document.querySelector(".user_login");
const loginBtn = document.querySelector(".login");


function showElement(element, isShow) {
    if (isShow) {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}

function buttonSignUp(event) {
    event.preventDefault();
    showElement(register, true);
    showElement(saveBtn, false);
    showElement(btnsubmit, true);
    showElement(colorId, true);
    showElement(containerDiv, false);
    showElement(user_login, false);
    showElement(loginBtn, false);


};

function buttonLogout(event){
    showElement(containerDiv, false);
    showElement(logOutBtn, false);
    showElement(signUpBtn, false);
    showElement(loginBtn, true);
    showElement(userLoginDiv, true);
    showElement(user_login, true);
    showElement(register, false);
    showElement(colorId, false);
    showElement(btnsubmit, false);
    showElement(saveBtn, true);
   

}

//...............button show and hide element..................//
const logOutBtn = document.querySelector(".logOut");
logOutBtn.addEventListener("click",buttonLogout);

//...............button show and hide element..................//
const signUpBtn = document.querySelector(".sign_up");
signUpBtn.addEventListener("click", buttonSignUp);


//................function ask user can login or not...................//
function Userlogin(response) {
    let users = response.data;

    //...............get value from input....................//
    const input_username = document.querySelector("#username").value;
    const input_password = document.querySelector("#password").value;

    let iscorrect = false;

    for (let user of users) {
        if (user.username === input_username && user.password === input_password) {

            //..........show and hide element................//
            showElement(containerDiv, true);
            showElement(userLoginDiv, false);
            showElement(signUpBtn, false);
            showElement(loginBtn, false);
            showElement(logOutBtn, true);


            iscorrect = true;
            //................add value into object............//
            User.username = user.username;
            User.password = user.password;
            User.color = user.color;

        }
    }
    if (iscorrect===false) {
        confirm("wrong password or username!!")
    }
}

//.............function save user login...............//
function buttonSave(e) {
    e.preventDefault();
    const url = "http://localhost:5000/users";
    // const url = "https://free-9chat.herokuapp.com/users";
    axios.get(url).then(Userlogin).catch(console.log("error"));


};

//...............button save user login......................//
const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", buttonSave);


//..............function for user register................//
function UserRegister(response) {
    let users = response.data;

    //...............get value from input....................//
    const input_username = document.querySelector("#username").value;
    const input_password = document.querySelector("#password").value;
    const input_color = document.querySelector("#color").value;

    //............alert message when input empty...................//
    if (input_username === "") return confirm("input username cannot empty!!")
    if (input_password === "") return confirm("input password cannot empty!!")

    //..........show and hide element................//
    showElement(containerDiv, true);
    showElement(userLoginDiv, false);
    showElement(signUpBtn, false);
    showElement(loginBtn, false);
    showElement(logOutBtn, true);

    //..........add value into object...............//
    User.username = input_username;
    User.password = input_password;
    User.color = input_color;
}



//...........function submit form register................//
function BtnSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:5000/users";
    // const url = "https://free-9chat.herokuapp.com/users";
    axios.get(url).then(UserRegister);

}

//...............button submit form register.................//
const btnsubmit = document.querySelector("#submit");
btnsubmit.addEventListener("click", BtnSubmit);


//.......................send message........................//
function sendMessage(e) {
    var x = document.getElementById("myAudio");
    x.play();
    const text = document.querySelector("#textId").value;
    
    User.text = text;
    User.bold = bold;
    User.italic = italic;
    const url = "http://localhost:5000/users";
    // const url = "https://free-9chat.herokuapp.com/users";
    axios.post(url, User).then(displayUser);

    document.querySelector("#textId").value = "";
    disablebutton();


}

let enablebutton = () =>{
    btnsend.removeAttribute("disabled");
}


let disablebutton = () => {
    btnsend.setAttribute("disabled" , "");
};

document.addEventListener("keyup",() =>{
    const text_message = document.querySelector("#textId").value;
    if (text_message !== ""){
        
        enablebutton();

    }else{
        disablebutton();
    }
})

//...............button send message.........................//
const btnsend = document.querySelector("#send_message");
btnsend.addEventListener('click', sendMessage);

//.......................load data.............................//
function loadData() {
    const url = "http://localhost:5000/users";
    // const url = "https://free-9chat.herokuapp.com/users";
    axios.get(url).then(displayUser);
}

//.........create empty object for store all value.................//
let User = {};
let italic = "";
let bold = "";


//........... text bold..............//
function covertToBold() {
    bold = "B";
    
}
 
const textBold = document.querySelector("#bold");
textBold.addEventListener("click", covertToBold);


//...............text italic....................//
function covertToItalic() {
    italic = "I";
}

const textItalic = document.querySelector("#italic");
textItalic.addEventListener("click", covertToItalic);



    






setInterval(loadData,5000);

