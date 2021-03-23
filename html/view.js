// Created by Mahdi Parastesh, February and March 2021
// LinkedIn: https://www.linkedin.com/in/mahdi-parastesh-a72ab51b9/
// All rights reversed.

$("td").click(function() {
    let input = document.body.appendChild(document.createElement("input"));
    input.value = $(this).text();
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);

    if ($(this).hasClass("copied")) $(this).removeClass("copied");
    $(this).attr("title", "کپی شد!");
    let tt = new bootstrap.Tooltip(this, { boundary: 'window' });
    $(this).addClass("copied");
    $(this).tooltip('show');
    setTimeout(() => {
        $(this).removeClass("copied");
        $(this).tooltip("hide");
        $(this).removeAttr("title");
    }, 1000);
});


// Resume the current table
function updateTable() {
    let sym = $("#main").attr("data-symbol"),
        tfr = $("#main nav .active").index();
    $.ajax({
        url: "/action?q=update_table&a1=" + sym + "&a2=" + tfr,
        context: document.body,
        timeout: 10000
    }).done(function(data) {
        switch (data) {
            case "saved":
                alert("دستوری که دادید بزودی انجام داده خواهد شد!");
                break;
            default:
                alert(data);
        }
    });
}


// Deletion
function z(d) {
    if (d < 10) return "0" + d; else return d;
}
function dateModel(cal) {
    let s = $("#dateSeparator").val(), t = $("#timeSeparator").val();
    return cal.Y+s+z(cal.M+1)+s+z(cal.D)+s+z(cal.H)+t+z(cal.I);
}
function omit() {
    let cal = new SolarHijri(new Date()),
        def = dateModel(cal) +" - "+ dateModel(cal),
        sym = $("#main").attr("data-symbol"),
        tfr = $("#main nav .active").index(),
        tfrName = $("#main nav .active")[0].innerHTML.split("<span")[0].replaceAll("&nbsp;", "");
    let board = prompt("لطفا بازه زمانی موردنظر برای از قلم انداختن شمع های تایم فریم '" + tfrName
        + "' را انتخاب کنید...", def);
    if (board == null || board == "") return;
    $.ajax({
        url: "/action?q=delete&a1=" + sym + "&a2=" + tfr + "&a3=" + board,
        context: document.body,
        timeout: 5000
    }).done(function(data) {
        if (data == "invalid date") alert("بازه زمانی را اشتباه وارد کردید!");
        if (data == "saved") alert("درخواستی که دادید چند لحظه دیگر اجرا خواهد شد...");
    });
}
function truncate() {
    let sym = $("#main").attr("data-symbol"),
        tfr = $("#main nav .active").index(),
        tfrName = $("#main nav .active")[0].innerHTML.split("<span")[0].replaceAll("&nbsp;", "");
    if (!confirm("آیا از خالی کردن تمام اطلاعات موجود برای تایم فریم '" + tfrName + "' مطمئن هستید؟")) return;
    $.ajax({
        url: "/action?q=delete&a1=" + sym + "&a2=" + tfr,
        context: document.body,
        timeout: 5000
    }).done(function(data) {
        if (data == "saved") alert("درخواستی که دادید چند لحظه دیگر اجرا خواهد شد...");
    });
}
function destroy() {
    let sym = $("#main").attr("data-symbol"),
        symName = $("#header h3")[0].innerHTML;
    if (!confirm("آیا از خالی کردن تمام اطلاعات موجود برای نماد '" + symName + "' مطمئن هستید؟")) return;
    $.ajax({
        url: "/action?q=delete&a1=" + sym,
        context: document.body,
        timeout: 5000
    }).done(function(data) {
        if (data == "saved") alert("درخواستی که دادید چند لحظه دیگر اجرا خواهد شد...");
    });
}
