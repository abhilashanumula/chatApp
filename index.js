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





// const express = require('express')
// const path = require('path')
// const mongoose = require('mongoose')
// const app = express()
// const port = 8001

// // app.use('/static', express.static('static'))

// app.set('view engine', 'pug')
// app.set('views', path.join(__dirname, 'views'))

// app.use(express.urlencoded())

// /***************MongoDB****************/

// async function mongo_main() {
//     await mongoose.connect('mongodb://127.0.0.1/nowhere', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => console.log("Mongo Connected"))
// }
// //mongo_main()

// const Details = new mongoose.Schema({
//     name: String,
//     age: String,
//     mail: String
// })

// const details = mongoose.model('details', Details)

// /**************************************/

// /************Writing to DB*************/


// async function writ(k) {
//     let rs = new details({
//         name: k.name,
//         age: k.age,
//         mail: k.mail
//     })
//     rs.save((err, rs) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(`Details of ${k.name} are saved to nowhere db : ${rs}`)
//         }
//     })

// }

// /**************************************/
// /**************************************/
// /**************************************/
// /**************************************/

// // app.get('/', (req, res) => {
// //     res.status(200).render('home.pug', {})
// // })
// app.get('/contact', (req, res) => {
//     res.status(200).render('contact.pug', {})
// })

// app.get('/', (req, res) => {
//     res.status(200).render('home.pug', {})
// })

// app.post('/contact', (req, res) => {
//     console.log(req.body)
//     async function sve() {
//         await writ(req.body)
//             .then(() => console.log(`${req.body.name} db Created`))
//             .catch((err) => console.log(err))
//     }
//     //sve()
//     res.send(`Submitted successfully
//     <a href='http://127.0.0.1:5500/chat/index.html'>Click here</a>
//     `)
// })







// app.listen(port, () => {
//     console.log(`listening on http://127.0.0.1:${port}`)
// })

