const http = require('http')
const express =require('express')
const {Server:SocketServer}=require('socket.io')

const pty=require('node-pty');
var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn('shell', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

const app =express();
const server = http.createServer(app);
const io=new SocketServer({
    cors:'*',
})

io.attach(server);

io.on('connection', ()=>{
    console.log('Socket Connected', socket.id);

    socket.on('terminal.write', (data)=>{
        ptyProcess.write(data);
    })
})  

server.listen(9000,()=>
    console.log(`🐋 Docker server running on port 9000`)
)