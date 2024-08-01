new function() {
    var _self = this;
    _self.width = 750; //设置默认最大宽度
    _self.fontSize = 100; //默认字体大小
    _self.widthProportion = function() {
        var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
        return p > 1 ? 1 : p < 0.4 ? 0.5 : p;
    }; //判断当前屏幕尺寸，设置的最大屏幕宽度之间的比例
    _self.changePage = function() {
            document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px !important");
        } //修改根元素html的font-size的植
    _self.changePage();
    window.addEventListener('resize', function() {
        _self.changePage();
    }, false); //侦听屏幕宽度变化


};

$(function() {

    $('.action .online-btn,.online-aside').click(function(){

        $('.online-pop').stop().fadeIn();
    });
    
    $('.online-pop .close').click(function(){

        $('.online-pop').stop().fadeOut();
    });

    $('.success-pop .close').click(function(){

        $('.success-pop').stop().fadeOut();
    });

    //下拉
    $('.online-select p').click(function(){

        $(this).siblings('ul').stop().slideToggle();
    });

    $('.online-select ul').mouseleave(function(){

        $(this).stop().slideUp();
    });

    $('.online-scene').on('click','li',function(){

        var name = $(this).text();
        var cid = $(this).attr('data-id');
        var url = '/solution/scene_cate_ajax.html';
        var res = getScene(url, cid);
        var div ='';

        for(var i = 0; i < res.data.length; i++){

            div +='<li data-id="'+res.data[i].id+'"><i></i>'+res.data[i].name+'</li>'
        }

        $(this).parent('ul').stop().slideUp().siblings('p').text(name).siblings('input').val(cid);
        $('.online-app ul').html(div);
        $('.online-app input').val('');
    });

    $('.online-way').on('click','li',function(){

        var name = $(this).text();

        $(this).parent('ul').stop().slideUp().siblings('p').text(name).siblings('input').val(name);
    });

    $('.online-app').on('click','li',function(){

        $(this).toggleClass('on');
        appSelect();
    });

    function appSelect(){

        var str = ''
        var name = ''
        $('.online-app li').each(function(){

            if($(this).hasClass('on')){

                str += $(this).attr('data-id') + ','
                name += $(this).text() + ','
            }

        });
        $('.online-app p').text(name.substring(0,name.length-1))
        $('.online-app input').val(name.substring(0,name.length-1))
    }

    $('.online-area').on('click','li',function(){

        var name = $(this).text();
        $('.step-city').show();
        $(this).parent('ul').stop().slideUp().siblings('p').text(name).siblings('input').val(name);

    });


    $('#consult_submit').on('click', function(){


        console.log(111)

        $('#consult_form').ajaxSubmit({
            dataType: 'json',
            beforeSubmit:function() {
                layer.msg('submitting...');
            },

            // 提交成功

            success:function(res) {
                if (res.flag > 0) {
                    layer.msg('success');
                    setTimeout(function () {
                        //window.location.reload();
                       
                        $('.online-pop').stop().hide();
                        $('.success-pop').stop().fadeIn();

                    }, 800);

                } else {
                    layer.msg(res.msg, function(){});
                }

            },

            // 提交失败

            error:function() {
                layer.msg("fail", function(){});
            }
        });
    }); 
    $('#consult_submit1').on('click', function(){


        console.log(222)

        $('#consult_form1').ajaxSubmit({
            dataType: 'json',
            beforeSubmit:function() {
                layer.msg('submitting...');
            },

            // 提交成功

            success:function(res) {
                if (res.flag > 0) {
                    layer.msg('success');
                    setTimeout(function () {
                        //window.location.reload();
                       
                        $('.online-pop').stop().hide();
                        $('.success-pop').stop().fadeIn();

                    }, 800);

                } else {
                    layer.msg(res.msg, function(){});
                }

            },

            // 提交失败

            error:function() {
                layer.msg("fail", function(){});
            }
        });
    }); 


    //头部滚动效果
    // $(window).scroll(function() {

    //     var top=$(window).scrollTop();

    //     if(top > 10){

    //         $('.header').addClass('head-fixed');
    //     }else{

    //         $('.header').removeClass('head-fixed');
    //     }
    // });

    $('.header .nav li').hover(function() {

        $(this).find('.erify').stop().slideToggle();
    });


    //下拉选择
    $('.select p').click(function() {

        $(this).siblings('ul').stop().slideToggle();
    });


    $('.select ul').mouseleave(function() {

        $(this).stop().slideUp();
    });

    $('.select').on('click', 'li', function() {

        var name = $(this).text();

        $(this).parent('ul').stop().slideUp().siblings('input').val(name).siblings('p').text(name);

    });


    //移动端导航
    $('.m_sub_left,.m_sub_right').height($(window).height() - 50);
    $('.m-nav').click(function() {

        $('.sub_header').stop().slideToggle();
        $('.m_search_main').slideUp();
    });

    $('.m-search').click(function() {

        $('.m_search_main').stop().slideToggle();
        $('.sub_header').slideUp();
    });

    $('.m_sub_left li').click(function() {

        var index = $(this).attr('rel');

        $('.m_sub_right ul').eq(index).show().siblings().hide();
    });


    win();

    $(window).resize(function() {

        win();
    });


    if ($('.apply-nav').length > 0) {

        $('.apply-list li').eq(0).show().siblings().hide();

        $('.apply-nav .item').hover(function() {

            var ai = $(this).index();

            $(this).addClass('item-show').siblings().removeClass('item-show');
            $('.apply-list li').eq(ai).show().siblings().hide();
        });
    }


    //百度分享
    //app.share();

});


function win() {

    var winW = $(window).width();
    var winH = $(window).height();

    if (winW > 750) {

        var sw = winW * 0.5677;
    } else {

        var sw = winW;
    }

    if ($('.station').length > 0) {

        $('.station .list li').width(sw);
        $('.station .list ul').width(sw * 3);
    }

    //案例切换

    var curPage = $('.station #curPage').val();

    $('.station .prev').click(function() {

        if (curPage == 0) {

            curPage = 2;
        } else {

            curPage--;
        }

        $('.station .list ul').stop().animate({ 'marginLeft': -(curPage * sw) + 'px' });
        $('.station .nav li').eq(curPage).addClass('on').siblings().removeClass('on');

    });

    $('.station .next').click(function() {

        if (curPage == 2) {

            curPage = 0;
        } else {

            curPage++;
        }

        $('.station .list ul').stop().animate({ 'marginLeft': -(curPage * sw) + 'px' });
        $('.station .nav li').eq(curPage).addClass('on').siblings().removeClass('on');

    });

    $('.station .nav li').click(function() {

        curPage = $(this).index();

        $(this).addClass('on').siblings().removeClass('on');
        $('.station .list ul').stop().animate({ 'marginLeft': -(curPage * sw) + 'px' });
        $('.station #curPage').val(curPage);
    });
}


//百度分享
// var app = new Object({
//     share: function() {
//         window._bd_share_config = { "common": { "bdSnsKey": {}, "bdText": "", "bdMini": "2", "bdMiniList": false, "bdPic": "", "bdStyle": "0", "bdSize": "16" }, "share": {} };
//         with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
//     },
// });

//提示信息
function comMsg(str) {

    $(".msg-pop-main p").text(str);
    var width = $(".msg-pop-main").width();
    var height = $(".msg-pop-main").height();
    $(".msg-pop-main").css({ "marginTop": -(height / 2), "marginLeft": -(width / 2) });
    $(".msg-pop-main").fadeIn();
    setTimeout(function() {
        $(".msg-pop-main").fadeOut();
    }, 1500);
}