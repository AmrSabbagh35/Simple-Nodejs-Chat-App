const chatform = document.getElementById('chat-form');
const socket = io(); 
const chatmessages = document.querySelector('.chat-messages');

//message from server 
socket.on('message',message=>{
console.log(message);
outputMessage(message);

//scroll down 
chatmessages.scrollTop = chatmessages.scrollHeight;
});

// message submit

chatform.addEventListener('submit',(e)=>{
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value;
    
    //emitting a message to server
    socket.emit('chatmessage',msg); 

    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus(); 
});

// output message to dom 
function outputMessage(message){
    const div = document.createElement('div'); 
    div.classList.add('message'); 
    div.innerHTML= `	<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`; 
    document.querySelector('.chat-messages').appendChild(div); 
}