var io = require('socket.io')();
var userList = [];
io.on("connection",function (socket) {
   //登录的方法
    socket.on('login',function(user){
        user.id = socket.id;
        userList.push(user);
        //向所有用户发送用户列表
        io.emit('uesrList',userList);
        //向用户本身发送信息
        socket.emit('userInfo',user);
        //除自己本身向所有用户发送消息
        socket.broadcast.emit('loginInfo',user.name+"上线了。");
    })
});
exports.listen = function (_server) {
    io.listen(_server);
};
