

init();

function init() {
    Application.httpGet('/warehouse', function (data) {
        let html = '';
        data.map(function (ele) {
            html += fullListView(JSON.parse(ele));
        });
        // $("#example").dataTable().fnDestroy();
        $('#example tbody').html(html);
        // initTbody();
    });
    initValidate();
    search();
    initContribution();
}

/**
 * 初始化验证
 */
function initValidate() {
    bootstrapValidate(
        '#email',
        'email:Enter a valid E-Mail Address!'
    );
}
/**
 * 订阅
 */
function initContribution() {
    $('#contribution').click(function (e) {
        let email = $('#email').val();
        let error = $('#email').parent().hasClass('has-error');
        if (email && !error) {
            $.ajax({
                url: Application.APIURL + '/subscribe',
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                data: JSON.stringify({
                    email: email
                }),
                success: function (data) {
                    let res = JSON.parse(data);
                    if (res.status === 200) {
                        alert('订阅成功。');
                        $('#myModal').modal('hide');
                    } else {
                        alert('服务器异常');
                    }

                },
                error: function (err) {
                    let error = JSON.parse(err.responseText);
                    if (error.status === 500) {
                        alert('账号已订阅');
                    }
                }
            })
        }
    })
}
/**
 * 填充Tbody View
 * */
function fullListView(ele) {
    let tagView = fullTagView(ele.d.split(','));
    return `<tr>
                <td><a href="${ele.l}" target="_blank">${ele.t}</a></td>
                <td>${tagView}</td>
            </tr>`;
}


function fullTagView(arr) {
    return arr.map(function (e) {
        return `<span class="label label-primary">${e}</span>`;
    })
}

/**
 * 初始化配置dataTables
 * */
function initTbody() {
    $(document).ready(function () {
        $('#example').DataTable({
            columnDefs: [
                { orderable: false, width: '30%', targets: 0, },
                { orderable: false, width: '10%', targets: 1, },
                { orderable: false, width: '50%', targets: 2, },
                { orderable: false, width: '5%', targets: 3, },
            ],
            fixedColumns: true,
            fnDrawCallback: function (oSettings) {
                $("#dataTable thead tbody th:first").removeClass("sorting_asc");
            },
        });
    });
}


function search() {
    $('#search').click(function () {
        let q = $('#q').val();
        if (q && q !== '') {
            queryByQ(q);
        } else {
            alert("输入不能为空！");
        }

    })
}

function queryByQ(q) {
    Application.httpGet('/warehouse/search/' + q, function (data) {
        let html = '';
        data.map(function (ele) {
            html += fullListView(JSON.parse(ele));
        });
        // $("#example").dataTable().fnDestroy();
        $('#example tbody').html(html);
        // initTbody();
    });
}