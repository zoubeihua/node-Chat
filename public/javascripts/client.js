/**
 * Created by beihua on 2016/8/8.
 */
var userSelf = {};
var toOneId;
var userlistArray = new Array();
$(function(){
    $('#myModal').modal({
        keyboard: false
    });
    // Messenger.options = {
    //     extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    //     theme: 'flat'
    // };
    // $('.popover-dismiss').popover('show');

    //检查用户名是否存在.
    function checkUser(name){
        var haveName = false;
        $(".user-content").children('ul').children('li').each(function(){
            if(name == $(this).find('h6').text()){
                haveName = true;
            }
        });
        return haveName;
    }

    //登录
    $('#btn-setName').click(function(){
        var name = $('#username').val();

        if(checkUser(name)){
            $('#username').val('');
            alert('昵称已经存在或不能是空的！');
        }else{
            var imgList = ["/images/1.jpg","/images/2.jpg","/images/3.jpg","/images/4.jpg","/images/5.jpg"];
            var randomNum = Math.floor(Math.random()*5);
            //随机的用户头像
            var img = imgList[randomNum];
            //用户信息 json格式
            var dataObj = {
                name:name,
                img:img
            };
            //将用户信息发送到服务器
            socket.emit('login',dataObj);
            //隐藏登录模式
            $('#myModal').modal('hide');
            $('#username').val('');
            $('#msg').focus();
        }
    });
    //发送消息
    $('#sendmsg').click(function(){
        var msg = $('#msg').val();
        if(msg==''){
            alert('请输入先输入内容!');
            return;
        }
        var from = userSelf;
        var msgObj = {
            from:from,
            msg:msg
        };
        socket.emit('toAll',msgObj);
        addMsgFromUser(msgObj,true);
        $('#msg').val('');
    });


});


//回车发送消息
function keywordsMsg(e){
    var event1 = e || window.event;
    if(event1.keyCode == 13){
        $('#sendmsg').click();
    }
}

//设置用户名回车方法
function keywordsName(e){
    var event1 = e || window.event;
    if(event1.keyCode == 13){
        $('#btn-setName').click();
    }
}
//私密发送回车方法
function keywordsName1(e){
    var event1 = e || window.event;
    if(event1.keyCode == 13){
        $('#btn_toOne').click();
    }
}

//上线用户全加入列表
function  addUser(userList) {
    var userListConent = document.getElementById("userListConent");
    var d = new Date();
    var dates = (d.getMonth()+1)+"-"+d.getDate();
    if(userlistArray.length > 0)
    {
        for(var i = 0; i < userlistArray.length; i++)
        {
            userListConent.removeChild(userlistArray[i]);
        }
    }
    userlistArray = new Array();
    for(var i = 0; i < userList.length; i++)
    {
        var Elli = document.createElement("li");
        Elli.className = "clear list-m list-h";
        userListConent.appendChild(Elli);
        userlistArray.push(Elli);

        var Ediv = document.createElement("div");
        Ediv.className = "imglist col-md-2 clear-p";
        Elli.appendChild(Ediv);

        var Eimg = document.createElement("img");
        Eimg.src = userList[i].img;
        Ediv.appendChild(Eimg);

        var Euserdiv = document.createElement("div");
        Euserdiv.className = "imglist col-md-8 clear-p";
        Elli.appendChild(Euserdiv);

        var Eh6 = document.createElement("h6");
        Eh6.innerHTML = userList[i].name;
        Euserdiv.appendChild(Eh6);

        var Ep = document.createElement("p");
        Ep.className = "newstext";
        Ep.style.color = "red";
        Ep.innerHTML = "米虫专属";
        Euserdiv.appendChild(Ep);

        var Etimediv = document.createElement("div");
        Etimediv.className = "imglist col-md-2 clear-p";
        Elli.appendChild(Etimediv);

        var Etimep = document.createElement("p");
        Etimep.innerHTML = dates;
        Etimep.className = "time";
        Etimediv.appendChild(Etimep);
    }
}
//离线移除用户对象
function removeUser(userList){
    
}
//添加消息到消息列表
function addMsgFromUser(msgObj,isSelf){
    var Chatcontent = document.getElementById("Chatcontent");
    var msgType = isSelf ? "messagmy" : "messagparty";
    if(isSelf == false)
    {
        var Emessagparty = document.createElement("div");
        Emessagparty.className = "messagparty";
        Chatcontent.appendChild(Emessagparty);

        var EdivCont = document.createElement("div");
        EdivCont.className = "imglist userinfo col-md-1 clear-p tox-m";
        Emessagparty.appendChild(EdivCont);

        var Elimg = document.createElement("img");
        Elimg.src = msgObj.from.img;
        EdivCont.appendChild(Elimg);

        var EdivUsernam = document.createElement("div");
        EdivUsernam.className = "imglist userinfo col-md-11 clear-p postion";
        Emessagparty.appendChild(EdivUsernam);

        var ElnameP = document.createElement("p");
        ElnameP.innerHTML = msgObj.from.name;
        EdivUsernam.appendChild(ElnameP);

        // var Elspan = document.createElement("span");
        // Elspan.className = "triangle";
        // EdivUsernam.appendChild(Elspan);

        var Elmsgp = document.createElement("p");
        Elmsgp.className = "partyarticle";
        Elmsgp.innerHTML = replace_em(msgObj.msg);
        Emessagparty.appendChild(Elmsgp);
    }
    else
    {
        var Emessagparty = document.createElement("div");
        Emessagparty.className = "messagmy";
        Chatcontent.appendChild(Emessagparty);

        var EdivCont = document.createElement("div");
        EdivCont.className = "imglist userinfo col-md-1 clear-p tox-m pull-right";
        Emessagparty.appendChild(EdivCont);

        var Elimg = document.createElement("img");
        Elimg.src = msgObj.from.img;
        EdivCont.appendChild(Elimg);

        var EdivUsernam = document.createElement("div");
        EdivUsernam.className = "imglist userinfo col-md-11 clear-p postion pull-right";
        Emessagparty.appendChild(EdivUsernam);

        var ElnameP = document.createElement("p");
        ElnameP.className = "pull-right";
        ElnameP.innerHTML = msgObj.from.name;
        EdivUsernam.appendChild(ElnameP);

        // var Elspan = document.createElement("span");
        // Elspan.className = "triangleright pull-right";
        // EdivUsernam.appendChild(Elspan);

        var Elmsgp = document.createElement("p");
        Elmsgp.className = "myarticle";
        Elmsgp.innerHTML = replace_em(msgObj.msg);
        Emessagparty.appendChild(Elmsgp);
    }
    $(".Chatcontent").scrollTop($(".Chatcontent")[0].scrollHeight);

}

//上线消息显示
function addMsgFromSys(msg,type){
    if(type == 1)
    {
        $.scojs_message(msg, $.scojs_message.TYPE_OK);
    }
    else
    {
        $.scojs_message(msg, $.scojs_message.TYPE_TYPE_ERROR);
    }

}
