const http = require('http')
const url = require('url')
const fs = require('fs')
const EventEmmiter = require("events")

let MyEmit = new EventEmmiter()
MyEmit.on('index',(res)=>{
    fs.readFile("./index.html",(err,data)=>{
        if (err){
            console.error(err)
            res.end("Il y a une erreur serveur")
        }else{
            res.write(data)
            res.end()
        }
    })  
})

MyEmit.on('css',(res)=>{
    fs.readFile("./style.css",(err,data)=>{
        if (err){
            console.error(err)
            res.end("Il y a une erreur serveur")
        }else{
            res.write(data)
            res.end()
        }
    })  
})

MyEmit.on('autre',(res)=>{
    res.write("<p>Cette page n'est pas disponible</p>")
    res.end()
})

let app = http.createServer((req, res) => {
    console.log("il y a une requete")
    let myUrl = url.parse(req.url, true)
    console.log(myUrl.query.var1)
    console.log(req.method)

    
    if (req.url == "/index.html") {
        res.writeHead(200, { 'Content-type': "text/html;charset=utf8" })
        MyEmit.emit('index',res)
    }else if (req.url == "/style.css"){
        res.writeHead(200, {"Content-Type": "text/css"})
        MyEmit.emit('css',res)
    }else {
        MyEmit.emit('autre',res,req.url)
    }
})

app.listen(8080)