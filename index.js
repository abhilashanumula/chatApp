// const { Server } = ;
const io = require('socket.io')(8000)

let users = {};
let count = 0;

io.on('connection',socket=>{

console.log("Server connected")

    socket.on('new_join', name=>{  
        users[socket.id] = name;              //get req from user
        count+=1;
         console.log(count,' users')  
         socket.broadcast.emit('joined',{
            name: name,
            count: count
         });      //send req to user
        })
        socket.on('send', mess=>{                  //get req from user
        // console.log(mess)
        socket.broadcast.emit('recieve',{
            name :  users[socket.id],
            mess :  mess
        });                                    //send req to user
    })
    socket.on('disconnect',name=>{
        count-=1;
        console.log(count,' users')  
        socket.broadcast.emit('disconnected',{
            name: users[socket.id],
            count: count
         });      //send req to user
        delete users[socket.id];
    })

})
