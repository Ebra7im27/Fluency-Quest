// استدعاء الكورسات المخزنة في المتجر
const CoursesInShop = localStorage.getItem("CoursesInShop") // استدعاء القيم المخزنة
const AllCourse = document.querySelector(".Courses") // سيتم هنا إضافة الكورسات

// إذا كانت الكورسات موجودة، رسمها
if (CoursesInShop) {
    const item = JSON.parse(CoursesInShop) // تحويل البيانات من JSON
    drawCourses(item) // رسم الكورسات إذا كانت البيانات موجودة
}

// دالة لرسم الكورسات في الصفحة
function drawCourses(Courses) {
    const x = Courses.map((item) => {
        return `
            <div class="col-md-6" id="course-${item.id}"> <!-- إضافة بادئة 'course-' للـ ID -->
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${item.imageUrl}" class="card-img-top" alt="${item.title} learning image">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body font">
                                <h5 class="fw-bold">Course Name: ${item.title}</h5>
                                <p>Price: ${item.price}</p>
                                <p>Rating: ${item.rate}</p>
                                <p>Demand: ${item.demand}</p>
                                <div class="action d-flex justify-content-between align-items-center font">
                                    <div class="plusAndMinus">
                                        <i class="fas fa-minus text-danger colorfav countMinus" onclick="minusCourse(${item.id})"></i>
                                        <span class="count" id="countNum-${item.id}">${item.count}</span>
                                        <i class="fas fa-plus text-success colorfav countPlus" onclick="plusCourse(${item.id})"></i>
                                    </div>
                                    <button class="btn btn-danger" onclick="Remove(${item.id})">Delete Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join('')
    AllCourse.innerHTML = `<div class="row">${x}</div>` // إضافة الكورسات إلى الصفحة
}

// الدالة Remove تستخدم لإزالة عنصر من الصفحة بناءً على الـ ID الخاص به
function Remove(id) {
    // حذف العنصر من DOM
    const removedItem = document.getElementById(`course-${id}`)
    if (removedItem) {
        const priceText = removedItem.querySelector('p').textContent // احصل على النص الموجود في الفقرة
        const price = parseFloat(priceText.split(': ')[1]) // احصل على الرقم فقط
        removedItem.remove() // إزالة العنصر من الواجهة

        // تحديث البيانات في localStorage
        const CoursesInShop = localStorage.getItem("CoursesInShop")
        if (CoursesInShop) {
            const items = JSON.parse(CoursesInShop)
            // حذف العنصر من المصفوفة
            const updatedCourses = items.filter(course => course.id !== id)
            // تخزين البيانات المحدثة في localStorage
            localStorage.setItem("CoursesInShop", JSON.stringify(updatedCourses))

            // تحديث السعر الإجمالي بعد الحذف
            let getTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0
            getTotalPrice -= price // تقليل السعر
            localStorage.setItem("totalPrice", getTotalPrice) // تخزين السعر الجديد

            // تحديث العرض
            updateTotalPrice() // تحديث السعر المعروض
        }
    }
}

// استدعاء updateTotalPrice لعرض السعر عند تحميل الصفحة
updateTotalPrice()

function updateTotalPrice() {
    // الحصول على السعر الإجمالي من localStorage أو تعيينه إلى 0 إذا لم يكن موجودًا
    const getTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0

    const showPrice = document.querySelector(".totalprice")
    const priceSpan = showPrice.querySelector("span")

    if (getTotalPrice > 0) {
        showPrice.style.display = "block" // إظهار السعر
        priceSpan.innerHTML = getTotalPrice + " $" // عرض السعر
        console.log("Current total price: " + getTotalPrice)
    } else {
        showPrice.style.display = "none" // إخفاء العنصر إذا لم تكن هناك قيمة
    }
}

// دالة لزيادة الكمية
function plusCourse(id) {
    let xPlus = localStorage.getItem("CoursesInShop") ? JSON.parse(localStorage.getItem("CoursesInShop")) : []
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0

    xPlus.forEach((ele) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            totalPrice += price // زيادة السعر الإجمالي
            ele.count += 1

            // تحديث الكمية في الصفحة
            document.getElementById(`countNum-${id}`).textContent = ele.count
        }
    })

    localStorage.setItem("CoursesInShop", JSON.stringify(xPlus))
    localStorage.setItem("totalPrice", totalPrice) //localStorage تحديث السعر الإجمالي في 
    updateTotalPrice() // تحديث عرض السعر
}

// دالة لتقليل الكمية
function minusCourse(id) {
    let xMinus = localStorage.getItem("CoursesInShop") ? JSON.parse(localStorage.getItem("CoursesInShop")) : []
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0

    xMinus.forEach((ele, index) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            ele.count -= 1
            if (ele.count <= 0) { // إذا كانت الكمية أقل من أو تساوي 0
                totalPrice -= price // تقليل السعر الإجمالي
                xMinus.splice(index, 1) // حذف الكورس من المصفوفة
                document.getElementById(`course-${id}`).remove() // إزالة العنصر من الواجهة
            } else {
                totalPrice -= price // تقليل السعر الإجمالي
                document.getElementById(`countNum-${id}`).textContent = ele.count // تحديث الكمية
            }
        }
    })

    localStorage.setItem("CoursesInShop", JSON.stringify(xMinus))
    localStorage.setItem("totalPrice", totalPrice) // localStorage تحديث السعر الإجمالي في 
    updateTotalPrice() // تحديث عرض السعر
}

// تهيئة Swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
})

// رسم الدورات المفضلة
let favinShop = localStorage.getItem("favinShop")
let favCourses = document.querySelector(".swiper-wrapper") // المكان الذي ستعرض فيه المفضلة

if (favinShop) {
    let itemfav = JSON.parse(favinShop)
    drawCoursesfav(itemfav) // رسم المفضلة إذا كانت البيانات موجودة
}

// دالة لرسم الكورسات المفضلة
function drawCoursesfav(Courses) {
    let x = Courses.map((item) => {
        return `
            <div class="swiper-slide" id="fav-${item.id}"> <!-- إضافة بادئة 'fav-' للـ ID -->
                <div class="card card1 mx-auto" style="width: 18rem;">
                    <img src="${item.imageUrl}" class="card-img-top" alt="${item.title} learning image">
                    <div class="font card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="fw-bold">Course Name: ${item.title}</h5>
                                <p>Demand: ${item.demand}</p>
                            </div>
                            <i class="fas fa-heart ms-auto fs-4 text-danger colorfav" onclick="Removefav(${item.id})"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join('')
    favCourses.innerHTML = x // إضافة الكورسات المفضلة إلى الصفحة
}

// الدالة Removefav تستخدم لإزالة عنصر من الصفحة بناءً على الـ ID الخاص به
function Removefav(id) {
    let removedItem = document.getElementById(`fav-${id}`) // استخدام الـ ID المضاف
    if (removedItem) {
        removedItem.remove() // إزالة العنصر من الواجهة
    }

    // localStorage تحديث البيانات في 
    let CoursesInShop = localStorage.getItem("favinShop")
    if (CoursesInShop) {
        let item = JSON.parse(CoursesInShop)
        // حذف العنصر من المصفوفة
        let updatefav = item.filter(course => course.id !== id)
        // localStorage تخزين البيانات المحدثة في 
        localStorage.setItem("favinShop", JSON.stringify(updatefav))
    }
}