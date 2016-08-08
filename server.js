var io = require('socket.io')();
io.on("connection",function (socket) {
    console.log('用户上线')
    socket.on("disconnect",function () {
        console.log('用户离线')
    })
});
exports.listen = function (_server) {
    io.listen(_server);
};
