const Application = {
    // APIURL: "http://localhost:8080/v1/api",
    // HASHPATH: '',

    APIURL: "https://api.dongkji.com/api/v1/api/",
    HASHPATH: '/pc',


    httpGet: function (uri, callback) {
        $.ajax({
            url: Application.APIURL + uri,
            method: 'get',
            success: function (data) {
                let res = JSON.parse(data);
                if (res.status === 200) {
                    callback(res.data, res);
                } else {
                    callback(res.status);
                    alert('服务器异常');
                }
            },
            error: function (err) {
                callback('err', err);
            }
        })
    }
}
