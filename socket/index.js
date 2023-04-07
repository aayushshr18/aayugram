const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users=[];

const getUser=(userId)=>{
    return users.find(user=>user.userId===userId);
}
const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId)&&
    users.push({userId,socketId});

}

const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId);
}

io.on("connection",(socket)=>{
    console.log("User Connected to Socket.io");
    //Taking UserId and DocketId from user
    socket.on("addUser",userId=>{
            addUser(userId,socket.id);
            io.emit("getUsers",users);
    });

    //Send and Get Message
    socket.on("sendMessage",({senderId,recieverId,text})=>{
        const user=getUser(recieverId);
        io.to(user?.socketId).emit("getMessage",{senderId,text})
    })

    //User Disconnect remove
    socket.on("disconnect",()=>{
        console.log("A user Disconnected!");
        removeUser(socket.id);
        io.emit("getUsers",users);
    })
})