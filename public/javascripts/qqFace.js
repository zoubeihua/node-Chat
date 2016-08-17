/**
 * Created by Administrator on 2016/8/17.
 */
$(function(){
    $('#emotion').qqFace({
        assign:'msg', //给输入框赋值
        path:'/images/arclist/'    //表情图片存放的路径
    });
});
$("#sendmsg").click(function(){
    var str = $("#msg").val();
    $("#show").html(replace_em(str));
});

//查看结果
function replace_em(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g,'<img src="/images/arclist/$1.gif" border="0" />');
    return str;
}
