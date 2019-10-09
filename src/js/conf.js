const Application = {
    APIURL: "http://localhost:8080/v1/api",
    // APIURL: "https://api.dongkji.com/api/v1/api/",
    // HASHPATH: '/pc',
    HASHPATH: '',

    httpGet: function (uri, callback) {
        $.ajax({
            url: Application.APIURL + uri,
            method: 'get',
            success: function (data) {
                let res = JSON.parse(data);
                if (res.status === 200) {
                    callback(res.data);
                } else {
                    callback(res.status);
                    alert('服务器异常');
                }
            },
            error: function (err) {
                callback(err);
            }
        })
    }
}
