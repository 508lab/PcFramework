var scrollId = '';

init();

function init() {
    $('body').mLoading("show");
    initView();
    loadingMore();
    search();
}

function loadingMore() {
    $("#loading").click(function () {
        $('body').mLoading("show");
        Application.httpGet('/news/scroll/' + scrollId, function (data, res) {
            if (data === 'err' && res.statusText === 'error') {
                alert('缓存数据过期...将刷新页面');
                window.location.reload();
                return;
            }
            scrollId = res.scrollid;
            let html = $('.news').html();
            data.map(function (ele) {
                html += fullListView(JSON.parse(ele));
            });
            $('.news').html(html);
            $('body').mLoading("hide");
        });
    })
}

function search() {
    $('#search').click(function () {
        searchByQ();
    })

    $('#q').keydown(function (e) {
        if (e.keyCode === 13) {
            searchByQ();
        }
    })
}


function searchByQ() {
    let q = $('#q').val();
    if (q && q !== '') {
        queryByQ(q);
    } else {
        queryByQ('*');
        alert("输入不能为空！");
    }
}

function queryByQ(q) {
    $('body').mLoading("show");
    Application.httpGet('/news/search/' + q, function (data, res) {
        scrollId = res.scrollid; 
        let html = '';
        data.map(function (ele) {
            html += fullListView(JSON.parse(ele));
        });
        $('.news').html(html);
        $('body').mLoading("hide");
    });
}

function initView() {
    $('header nav li.nnews').addClass('active');
    Application.httpGet('/news', function (data, res) {
        scrollId = res.scrollid;
        let html = '';
        data.map(function (ele) {
            html += fullListView(JSON.parse(ele));
        });
        $('.news').html(html);
        $('body').mLoading("hide");
    });
}

function fullListView(ele) {
    let tagView = fullTagView(ele.d.split(','));
    return `<div class="row">
        <div class="col-md-8">
            <a href="${ele.l}" target="_blank">${ele.t}</a>
        </div>
        <div class="col-md-4" style="text-align: right;">
            <p>
                <span class="label label-info">${ele.s}</span>
            </p>
            <p>
                ${tagView}
            </p>
        </div>
    </div>`;
}

function fullTagView(arr) {
    let html = '';
    arr.map(function (e) {
        html += `&ensp;<span class="label label-primary">${e}</span>`;
    })
    return html;
}