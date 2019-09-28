init();

function init() {
    initView();
}

function initView() {
    Application.httpGet('/news', function (data) {
        let html = '';
        data.map(function (ele) {
            html += fullListView(JSON.parse(ele));
        });
        $('.news').html(html);
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