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


    text.value = "";

}





//.......................send message........................//
function sendMessage(e){
    const text = document.querySelector("#textId").value;
    let user = {text: text};
    const url = "http://localhost:5000/users";
    axios.post(url, user).then(displayUser);


}

//.......................load data.............................//
function loadData(){
    const url = "http://localhost:5000/users";
    axios.get(url).then(displayUser);
}


//...............button send message.........................//
const btnsend = document.querySelector("#send_message");
btnsend.addEventListener('click', sendMessage);


loadData();