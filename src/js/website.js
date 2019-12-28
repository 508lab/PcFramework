
init();

function init() {
    initValidate();
    initView();
}

/**
 * 初始化验证
 */
function initValidate() {
    //资源
    bootstrapValidate('#url', 'url:Please enter a valid URL!');
    bootstrapValidate('#email', 'email:Please enter a valid email!')
}

function initView() {
    $('header nav li.nwebsite').addClass('active');
    $("#add").click(function () {
        let url = $('#url').val();
        let email = $('#email').val();
        addItem({
            url: url,
            email: email
        }, '/sitesearch')
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
                alert('上传成功,反馈将在三天内放松到您的邮箱.');
                // window.location.reload();
            } else {
                alert('服务器异常');
            }
        },
        error: function (err) {
            $('body').mLoading("hide");
        }
    })
}
