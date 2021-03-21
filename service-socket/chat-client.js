var socket = io();

var chats = [];

var bChats = [];

var isUser = function() {
    return window.location.href.includes('chat');
}

$(document).ready(function(){
    if(isUser()) {
        var chatsStr = localStorage.getItem("bChats");
        bChats = JSON.parse(chatsStr);
        if (bChats == null) {
            bChats = [];
        }
        for (var i = 0; i < bChats.length; i++) {
            var chat = bChats[i];
            addChatBubble(chat.msg, chat.time, chat.type);
        }    
    }
    else {
        var chatsStr = localStorage.getItem("chats");
        chats = JSON.parse(chatsStr);
        if (chats == null) {
            chats = [];
        }
        for (var i = 0; i < chats.length; i++) {
            var chat = chats[i];
            addChatBubble(chat.msg, chat.time, chat.type);
        }    
    }
    
});

if(isUser()) {
    socket.on('message_from_kaushik', function(msg){

        console.log("message from kaushik-- ",msg);
        var time = new Date().toLocaleTimeString();
        addChatBubble(msg,time,'agentBubble');    
        var chat = {
            type : 'agentBubble',
            msg : msg,
            time : time
        }
        bChats.push(chat)
        localStorage.setItem("bChats", JSON.stringify(bChats));
    });    
}
else {
    socket.on('message_from_user', function(msg){

        console.log("message from user-- ",msg);    
        var time = new Date().toLocaleTimeString();
        addChatBubble(msg,time,'agentBubble');
        var chat = {
            type : 'agentBubble',
            msg : msg,
            time : time
        }
        chats.push(chat)
        localStorage.setItem("chats", JSON.stringify(chats));
    });
}


// click listeners
function sendClick() {

    var text = document.getElementById('chat_input_box').value;
    if (text == null || text === '') {
        return;
    }
    var time = new Date().toLocaleTimeString();
    addChatBubble(text,time,'chasitorBubble');
    var chat = {
        type : 'chasitorBubble',
        msg : text,
        time : time
    }
    
    document.getElementById('chat_input_box').value = '';
    
    if (isUser()) {
        socket.emit('chat_user', text);
        console.log("href-- ",window.location.href);
        bChats.push(chat)
        localStorage.setItem("bChats", JSON.stringify(bChats));
    }
    else {
        socket.emit('chat_message', text);
        chats.push(chat)
        localStorage.setItem("chats", JSON.stringify(chats));
    }
}


function addChatBubble(messageText, date, type) {
    var chasitorBubble = document.createElement('div');
    chasitorBubble.classList.add('chat-bubble' , type);

    var messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';

    var message = document.createElement('p');
    
    if (date == null || date === '') {
        message.innerHTML = messageText;    
    }
    else {
        var dateStr = "<span class = time-text>" + date + "</span>";
    message.innerHTML = messageText +"<br/>"+ dateStr;
    }

    messageDiv.appendChild(message);
    chasitorBubble.appendChild(messageDiv);

    let chatContainer = document.getElementById('chat-container');
    chatContainer.appendChild(chasitorBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}