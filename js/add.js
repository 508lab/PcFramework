$('#add').click(function () {
    let t = $('#t').val();
    let l = $('#l').val();
    let type = $('#type').val();
    let d = $('#d').val();
    if (t && l && type && d) {
        addItem({
            l: l,
            t: t,
            type: type,
            d: d,
        }, '/warehouse/');
    }
})


function addItem(data, uri) {
    $.ajax({
        url: Application.APIURL + uri,
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        data: JSON.stringify(data),
        success: function (data) {
            let res = JSON.parse(data);
            if (res.status === 200) {
                alert('上传成功');
            } else {
                alert('服务器异常');
            }
        }
    })
}