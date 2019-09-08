

init();

function init() {
    Application.httpGet('/warehouse/', function (data) {
        let html = '';
        data.map(function (ele) {
            html += fullListView(JSON.parse(ele));
        });
        $('#example tbody').html(html);
        initTbody();
    });

    search();
}
/**
 * 填充Tbody View
 * */
function fullListView(ele) {
    let tagView = fullTagView(ele.d.split(','));
    return `<tr>
                <td>${ele.t}</td>
                <td>${ele.type}</td>
                <td>${tagView}</td>
                <td><a href="${ele.l}" target="_blank">查看</a></td>
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
        $("#example").dataTable().fnDestroy();
        $('#example tbody').html(html);
        initTbody();
    });
}