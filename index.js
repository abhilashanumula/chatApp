// const { Server } = ;
// const io = require('socket.io')(8000)

// let users = {};
// let count = 0;

// io.on('connection',socket=>{

// console.log("Server connected")

//     socket.on('new_join', name=>{  
//         users[socket.id] = name;              //get req from user
//         count+=1;
//          console.log(count,' users')  
//          socket.broadcast.emit('joined',{
//             name: name,
//             count: count
//          });                                    //send req to user
//         })
//         socket.on('send', mess=>{                  //get req from user
//         // console.log(mess)
//         socket.broadcast.emit('recieve',{
//             name :  users[socket.id],
//             mess :  mess
//         });                                    //send req to user
//     })
//     socket.on('disconnect',name=>{
//         count-=1;
//         console.log(count,' users')  
//         socket.broadcast.emit('disconnected',{
//             name: users[socket.id],
//             count: count
//          });      //send req to user
//         delete users[socket.id];
//     })

// })

const express = require('express')
const app = express();


app.use('/static', express.static('static'))
app.use(express.json())
app.use(express.urlencoded())

app.get('/home',(req,res)=>{
    res.sendFile(__dirname+'/static/home.html')
})
let name = 'vkdsbvsaz'
app.post('/home',(req,res)=>{
    console.log(req.body)
    name = req.body.roomid;
    res.redirect(`${name}`)
})

app.get(`/${name}`, (req, res) => {
    const io = require('socket.io')(8000)

    let users = {};
    let count = 0;

    io.on('connection', socket => {

        console.log("Server connected")

        socket.on('new_join', name => {
            users[socket.id] = name; //get req from user
            count += 1;
            console.log(count, ' users')
            socket.broadcast.emit('joined', {
                name: name,
                count: count
            }); //send req to user
        })
        socket.on('send', mess => { //get req from user
            // console.log(mess)
            socket.broadcast.emit('recieve', {
                name: users[socket.id],
                mess: mess
            }); //send req to user
        })
        socket.on('disconnect', name => {
            count -= 1;
            console.log(count, ' users')
            socket.broadcast.emit('disconnected', {
                name: users[socket.id],
                count: count
            }); //send req to user
            delete users[socket.id];
        })

    })
    res.sendFile(__dirname+'/static/index.html')
})
        

app.listen(3000, () => console.log(3000))