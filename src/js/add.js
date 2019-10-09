
let names = ['#news', '#warehouse'];
init();
function init() {
    $('header nav li.contribution').addClass('active');
    initView();
    initValidate();
    add();
    addNews();
}

function initView() {
    let hash = window.location.hash;
    if (hash && hash !== '#') {
        showPage(hash);
    }
}

/**
 * 添加新闻
 */
function addNews() {
    $('#news #add').click(function () {
        let t = $('#news #t').val();
        let l = $('#news #l').val();
        let type = $('#news #type').val();
        let d = $('#news #d').val();
        let s = $('#news #s').val();
        let userurl = $('#news #userurl').val();
        if (t && l && type && d && s) {
            addItem({
                t: t,
                l: l,
                type: type,
                d: d,
                share: userurl,
                s: s
            }, '/news');
        } else {
            alert('输入不能为空');
        }
    });
}


/**
 * 显示当前页面内容
 * @param {*} name 
 */
function showPage(name) {
    names.map((e) => {
        if (e === name) {
            $(e).show();
        } else {
            $(e).hide();
        }
    })
}

/**
 * 初始化验证
 */
function initValidate() {
    //资源
    bootstrapValidate('#warehouse #l', 'url:Please enter a valid URL!');
    bootstrapValidate('#warehouse #t', 'min:3:Enter at least 3 characters!');
    bootstrapValidate('#warehouse #d', 'min:2:Enter at least 2 characters!');
    bootstrapValidate('#warehouse #type', 'min:2:Enter at least 2 characters!');

    //新闻

    bootstrapValidate('#news #l', 'url:Please enter a valid URL!');
    bootstrapValidate('#news #t', 'min:3:Enter at least 3 characters!');
    bootstrapValidate('#news #d', 'min:2:Enter at least 2 characters!');
    bootstrapValidate('#news #type', 'max:30:Enter at least 30 characters!');
    bootstrapValidate('#news #type', 'min:2:Enter at least 2 characters!');
    bootstrapValidate('#news #s', 'max:30:Enter at least 30 characters!');
    bootstrapValidate('#news #s', 'min:2:Enter at least 2 characters!');

}

function add() {
    $('#warehouse #add').click(function () {
        let t = $('#warehouse #t').val();
        let l = $('#warehouse #l').val();
        let type = $('#warehouse #type').val();
        let d = $('#warehouse #d').val();
        let userurl = $('#warehouse #userurl').val();
        if (t && l && type && d) {
            addItem({
                l: l,
                t: t,
                type: type,
                d: d,
                userurl: userurl,
            }, '/warehouse');
        } else {
            alert('输入不能为空');
        }
    })
}

function addItem(data, uri) {
    $('body').mLoading("show");
    $.ajax({
        url: Application.APIURL + uri,
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        data: JSON.stringify(data),
        success: function (data) {
            let res = JSON.parse(data);
            $('body').mLoading("hide");
            if (res.status === 200) {
                alert('上传成功,感谢您的贡献。');
                window.location.reload();
            } else {
                alert('服务器异常');
            }
        },
        error: function (err) {
            $('body').mLoading("hide");
        }
    })
}

window.addEventListener("hashchange", function (event) {
    let hash = window.location.hash;
    if (hash && hash !== '#') {
        showPage(hash);
    }
});