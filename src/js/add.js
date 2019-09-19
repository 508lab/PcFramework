
init();

function init() {
    initValidate();
    add();
}

/**
 * 初始化验证
 */
function initValidate() {
    bootstrapValidate('#l', 'url:Please enter a valid URL!');
    bootstrapValidate('#userurl', 'url:Please enter a valid URL!');
    bootstrapValidate('#t', 'min:3:Enter at least 3 characters!')
    bootstrapValidate('#d', 'min:2:Enter at least 2 characters!')
    bootstrapValidate('#d', 'max:30:Enter at least 30 characters!')
}

function add() {
    $('#add').click(function () {
        let t = $('#t').val();
        let l = $('#l').val();
        let type = $('#type').val();
        let d = $('#d').val();
        let userurl = $('#userurl').val();
        if (t && l && type && d) {
            addItem({
                l: l,
                t: t,
                type: type,
                d: d,
                userurl: userurl,
            }, '/warehouse');
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