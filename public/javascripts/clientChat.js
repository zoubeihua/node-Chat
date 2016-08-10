/**
 * Created by beihua on 2016/8/7.
 */
var socket = io();
//当用户登录系统通知
socket.on('loginInfo',function(msg){
    addMsgFromSys(msg,1);
});
//当用户退出系统通知
socket.on('loginOut',function(msg){
    addMsgFromSys(msg,0);
});

//所有登录的用户添加了列表里
socket.on('userList',function(userList){
    //modifyUserCount(userList.length);
    addUser(userList);
});
//用户退出移除列表对象
socket.on('userListOut',function(userList){
    addUser(userList);
});
//客户端登录后查看用户信息
socket.on('userInfo',function(userObj){
    //should be use cookie or session
    userSelf = userObj;
    $('#spanuser').text('欢迎您！ '+userObj.name);
    $('#userid').text(userObj.name);
    $('#userimg')[0].src = userObj.img;
});

//显示所有用户发送的消息
socket.on('toAll',function(msgObj){
    addMsgFromUser(msgObj,false);
});