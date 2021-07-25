const SOCKET_PORT = 9999;

const io = require('socket.io')(SOCKET_PORT, {
    cors: {
        origin: "http://localhost:3000"
    },
});


// list of online users
let onlineUsers = [];


// to add a new user in the onlineUsers list
const addUserToOnlineUsers = (userId, socketId) => {
    !onlineUsers.some(user => user.userId === userId) &&
    onlineUsers.push({userId, socketId});
};

// to remove a user from the onlineUsers list
const removeUserFromOnlineUsers = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

// to get a user from the list of online users
const getUserFromOnlineUsers = (userId) => {
    return onlineUsers.find(user => user.userId === userId);
}


// socket connection server side
io.on("connection", (socket) => {

    // when a user connects
    console.log("A User Connected . . .");
    // take user id and socket id of a user and add it to the list of online users
    socket.on("addUser", userId => {
        // to add new users in the onlineUsers list
        addUserToOnlineUsers(userId, socket.id);
        
        io.emit("getAllOnlineUsers", onlineUsers);
    })

    // send online users on request
    socket.on("getAllOnlineUsersSignal", signal => {
        if(signal){
            io.emit("getAllOnlineUsers", onlineUsers);
        }
    });

    // send and recieve message
    socket.on("sendMessage", ({senderId, recieverId, text}) => {
        const reciever = getUserFromOnlineUsers(recieverId);
        io.to(reciever?.socketId).emit("recieveMessage", {
            senderId, text,
        });
    })


    // when a user disconnects
    socket.on("disconnect", () => {
        console.log("A User Disconnected . . .");
        removeUserFromOnlineUsers(socket.id);
        io.emit("getAllOnlineUsers", onlineUsers);
    })

});
