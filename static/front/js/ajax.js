/*
    八个县区今日值班信息
*/
function ajaxFunction(url, data){

    var type = 'GET'; //GET or POST
    var url = url;
    var parmarr ={data:data};
    var ajaxData = $.parseJSON(ajaxMain(url, parmarr, type));

    return ajaxData;
}

function getScene(url, cid){

    var type = 'GET'; //GET or POST
    var url = url;
    var parmarr ={cid:cid};
    var sceneData = $.parseJSON(ajaxMain(url, parmarr, type));

    return sceneData;
}

/*
    通用方法
*/
function ajaxMain(url, parmArr, type){
    if(url != ''){
        var rel = $.ajax({
            type: type,
            url: url,
            async:false,
            data:parmArr,
            success: function (data) {
                return data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).responseText;
    }
    return rel;
}
