var io = require('socket.io')();
var underscore = require('underscore');
var userList = [];
io.on("connection",function (socket) {
   //登录的方法
    socket.on('login',function(user){
        user.id = socket.id;
        userList.push(user);
        //向所有用户发送用户列表
        io.emit('userList',userList);
        //向用户本身发送信息
        socket.emit('userInfo',user);
        //除自己本身向所有用户发送上线消息
        socket.broadcast.emit('loginInfo',user.name+"上线了。");
        console.log("登陆：" + JSON.stringify(userList));
    });
    //用户退出
    socket.on('disconnect',function(){
        var user = underscore.findWhere(userList,{id:socket.id});
        if(user){
            userList = underscore.without(userList,user);
            io.emit('userListOut',userList);
            socket.broadcast.emit('loginOut',user.name+"下线了。");
        }
    });
    //发送消息全部显示
    socket.on('toAll',function(msgObj){
        socket.broadcast.emit('toAll',msgObj);
    });
});
exports.listen = function (_server) {
    io.listen(_server);
};
