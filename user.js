
// const socket = io('http://127.0.0.1:8000');
// const { io } = require('socket.io-client');
// const io= require('/weapp.socket.io.js');
const socket = io('http://localhost:8000');


let name1 = prompt("Enter yor name: ");
socket.emit('new_join',name1);
link.innerHTML += `<br> 
You are chatting as <strong> ${name1} </strong>`


let box = document.querySelector('.container')

function append(mess,position){
     const ele = document.createElement('div')
    ele.innerText = mess;
    ele.classList.add('mess')
    ele.classList.add(position)
    box.append(ele)
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let mess = document.getElementById('messInp').value
    // console.log(mess)
    socket.emit('send',mess)
    append(mess,'right')
    document.getElementById('messInp').value = ''
   
})

socket.on('joined',name=>{
    cont.innerText = name.count;
    append(`${name.name} joined`, 'left')
})
socket.on('recieve',obj=>{
    append(`${obj.name}: ${obj.mess}` ,'left')
})
socket.on('disconnected',name=>{
    cont.innerText = name.count;
    append(`${name.name} disconnected`, 'left')
})