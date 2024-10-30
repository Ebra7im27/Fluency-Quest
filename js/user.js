document.addEventListener("DOMContentLoaded", function () {
    let userInfo = document.querySelector("#user_info");
    let usern = document.querySelector("#user");
    let usern2 = document.querySelector("#user2");
    let links = document.querySelector("#links");

    // تحقق من وجود الاسم في Local Storage
    if (localStorage.getItem("First Name") && localStorage.getItem("Last Name")) {
        // إذا كانت الأسماء موجودة، قم بإزالة العناصر المتعلقة بتسجيل الدخول
        if (links) links.remove(); // تأكد من أن links موجودة
        userInfo.style.display = "flex";
        usern.innerHTML = localStorage.getItem("First Name"),
            usern2.innerHTML = localStorage.getItem("Last Name")
    }

    // تسجيل الخروج
    let Delete = document.querySelector("#logout");
    if (Delete) {
        Delete.addEventListener("click", rem);
    }

    function rem() {
        localStorage.clear();
        location.reload(); // إعادة تحميل الصفحة بعد تسجيل الخروج
    }
});
