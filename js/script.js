let AllCourse = document.querySelector(".Courses") // هنا هيتم اضافه كل الكورسات
let Courses = [
    {
        id: 1,
        title: "English",
        price: "100$",
        rate: "★★★★★",
        demand: "High",
        imageUrl: "images/English learning image.jpg",
        count: 1
    },
    {
        id: 2,
        title: "Spanish",
        price: "90$",
        rate: "★★★★☆",
        demand: "High",
        imageUrl: "images/spanish language cover.jpg",
        count: 1
    },
    {
        id: 3,
        title: "French",
        price: "95$",
        rate: "★★★★☆",
        demand: "Medium",
        imageUrl: "images/french learning image .jpg",
        count: 1
    },
    {
        id: 4,
        title: "German",
        price: "110$",
        rate: "★★★☆☆",
        demand: "Medium",
        imageUrl: "images/German learning image book.jpg",
        count: 1
    },
    {
        id: 5,
        title: "Italian",
        price: "85$",
        rate: "★★★☆☆",
        demand: "Low",
        imageUrl: "images/italian learning image book.jpg",
        count: 1
    },
    {
        id: 6,
        title: "Japanese",
        price: "120$",
        rate: "★★★★☆",
        demand: "Medium",
        imageUrl: "images/japaneslearning image book.jpg",
        count: 1
    },
    {
        id: 7,
        title: "Chinese",
        price: "85$",
        rate: "★★★☆☆",
        demand: "Low",
        imageUrl: "images/chinese learning image book.jpg",
        count: 1
    },
    {
        id: 8,
        title: "Arabic",
        price: "100$",
        rate: "★★★☆☆",
        demand: "High",
        imageUrl: "images/Arabic language cover.jpg",
        count: 1
    },
    {
        id: 9,
        title: "Russian",
        price: "105$",
        rate: "★★★☆☆",
        demand: "Medium",
        imageUrl: "images/Russain language cover.jpg",
        count: 1
    }
]

function drawCourses() {
    let x = Courses.map((item) => {
        return `
            <div class="col-12 col-sm-4">
                <div class="card card1 mx-auto" style="width: 18rem;" data-aos="fade-up">
                    <img src="${item.imageUrl}" class="card-img-top" alt="${item.title} learning image">
                    <div class="font card-body z-1">
                        <h5 class="fw-bold">Course Name: ${item.title}</h5>
                        <p>Price: ${item.price}</p>
                        <p>Rating: ${item.rate}</p>
                        <p>Demand: ${item.demand}</p>
                        <div class="action d-flex justify-content-between align-items-center">
                            <button class="btn btn-success" id="purchase-${item.id}" data-price="${item.price}" onclick="ADD(${item.id})">Order Now</button>
                            <i id="favcolor-${item.id}" class="fas fa-heart ms-auto fs-4 text-secondary colorfav" onclick="fav(${item.id})"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join('')
    AllCourse.innerHTML = `<div class="row g-3 mb-3">${x}</div>`
}
drawCourses()

let titleCourses = document.querySelector(".items_course div") // كدا عرفت العنصر اللي هيتحط فيه عاسماء الكورسات اللي عاوزها
let badge = document.querySelector(".badge") // المكان اللي هيظهر فيه عدد الكورسات اللي اخترتها 

let addItem = localStorage.getItem("CoursesInShop") ? JSON.parse(localStorage.getItem("CoursesInShop")) : []
if (addItem) {
    addItem.map(item => {
        titleCourses.innerHTML += `<p>${item.title}
                                    <i class="fas fa-minus text-danger fs-6 m-lg-0 countMinus" onClick="minusCourse(${item.id})"></i>
                                    <span class="count">${item.count}</span>
                                    <i class="fas fa-plus text-success fs-6 m-lg-0 countPlus" onClick="plusCourse(${item.id})"></i>
                                    </p>`
    })
    badge.style.display = "block"
    badge.innerHTML = addItem.length
}

// استرجاع السعر الإجمالي الحالي من localStorage أو تعيينه إلى 0 إذا لم يكن موجودًا
let totalPrice = localStorage.getItem("totalPrice") ? parseFloat(localStorage.getItem("totalPrice")) : 0

// تحديث القيمة المعروضة للسعر الإجمالي عند التحميل أو إعادة التحميل
function refreshPrice() {
    let storedTotal = localStorage.getItem("totalPrice")
    totalPrice = storedTotal ? parseFloat(storedTotal) : 0
    // console.log("Total Price after refresh:", totalPrice)
}

refreshPrice() // تحديث السعر الإجمالي عند التحميل

function ADD(id) {
    if (localStorage.getItem("First Name") && localStorage.getItem("Last Name")) {
        let choseItem = Courses.find((item) => item.id === id)

        // التأكد من أن العدد الافتراضي هو 1 عند الإضافة لأول مرة
        choseItem.count = 1

        // التحقق إذا كان العنصر موجودًا بالفعل في الكارت، لتجنب تكرار الإضافة
        if (!addItem.some(item => item.id === choseItem.id)) {
            addItem = [...addItem, choseItem]
            localStorage.setItem("CoursesInShop", JSON.stringify(addItem))

            // تحديث السعر الإجمالي
            let price = parseFloat(choseItem.price.replace('$', ''))
            totalPrice += price
            localStorage.setItem("totalPrice", totalPrice)

            // تحديث العرض مباشرةً بعد الإضافة
            updateCourseDisplay(addItem)
        }
    } else {
        window.location = "login.html"
    }
}

let ShoppingCartIcon = document.querySelector(".cartIcon")
let ShowHeddin = document.querySelector(".items_course")

ShoppingCartIcon.addEventListener("click", Show)
function Show() {
    if (titleCourses.innerHTML != "") {
        if (ShowHeddin.style.display == "block") {
            ShowHeddin.style.display = "none"
        } else {
            ShowHeddin.style.display = "block"
        }
    }
}

// countPlusAndMinus...................................................................................................
function updateCourseDisplay(courses) {
    titleCourses.innerHTML = ""
    courses.forEach((ele) => {
        titleCourses.innerHTML += `<p>${ele.title}
                                    <i class="fas fa-minus text-danger fs-6 m-lg-0 countMinus" onClick="minusCourse(${ele.id})"></i>
                                    <span class="count">${ele.count}</span>
                                    <i class="fas fa-plus text-success fs-6 m-lg-0 countPlus" onClick="plusCourse(${ele.id})"></i>
                                    </p>`
    })
    badge.innerHTML = courses.length
    badge.style.display = courses.length ? "block" : "none"
}

function plusCourse(id) {
    let xPlus = localStorage.getItem("CoursesInShop") ? JSON.parse(localStorage.getItem("CoursesInShop")) : []
    let price

    xPlus.forEach((ele) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            totalPrice += price // زيادة السعر الإجمالي
            ele.count += 1
        }
    })
    updateCourseDisplay(xPlus)
    localStorage.setItem("CoursesInShop", JSON.stringify(xPlus))
    localStorage.setItem("totalPrice", totalPrice) // localStorage تحديث السعر الإجمالي في 
}

function minusCourse(id) {
    let xMinus = localStorage.getItem("CoursesInShop") ? JSON.parse(localStorage.getItem("CoursesInShop")) : []

    xMinus.forEach((ele, index) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            ele.count -= 1
            if (ele.count === 0) {
                totalPrice -= price // تقليل السعر الإجمالي
                xMinus.splice(index, 1)
            } else {
                totalPrice -= price // تقليل السعر الإجمالي
            }
        }
    })
    updateCourseDisplay(xMinus)
    localStorage.setItem("CoursesInShop", JSON.stringify(xMinus))
    localStorage.setItem("totalPrice", totalPrice) // localStorage تحديث السعر الإجمالي في 
}

// favourite.............................................................................................................
let countFvColor = 0
let addItemfav = localStorage.getItem("favinShop") ? JSON.parse(localStorage.getItem("favinShop")) : []

// الحفاظ على حالة الأيقونات الملونة عند تحميل الصفحة
function restoreFavIcons() {
    addItemfav.forEach(item => {
        let iconFvColor = document.querySelector(`#favcolor-${item.id}`)
        if (iconFvColor) {
            iconFvColor.classList.add('text-danger') // تلوين أيقونة المفضلة
        }
    })
}

// استدعاء الوظيفة عند التحميل
restoreFavIcons()

function fav(id) {
    if (localStorage.getItem("First Name") && localStorage.getItem("Last Name")) {
        let choseItem = Courses.find((item) => item.id === id)
        let iconFvColor = document.querySelector(`#favcolor-${choseItem.id}`)

        if (addItemfav.some(item => item.id === choseItem.id)) {
            addItemfav = addItemfav.filter(item => item.id !== choseItem.id)
            iconFvColor.classList.remove('text-danger')
            countFvColor-- // تقليل عدد العناصر المفضلة
        } else {
            addItemfav = [...addItemfav, choseItem]
            iconFvColor.classList.add('text-danger')
            countFvColor++ // زيادة عدد العناصر المفضلة
        }
        localStorage.setItem("favinShop", JSON.stringify(addItemfav)) // localStorage حفظ المفضلة في 
    } else {
        window.location = "login.html"
    }
}

// searchAndDemond.............................................................................................................
let searchMode = 'name'

function getSearchMood(selectedValue) {
    let search = document.querySelector(".form-control")
    if (selectedValue === 'name') {
        searchMode = 'name'
    } else {
        searchMode = 'demand'
    }
    search.placeholder = 'Search By ' + searchMode
    search.focus()
    search.value = ''
    drawCourses()
}

function searchCourses(value) {
    let results = '' // مصفوفة لتخزين النتائج
    for (let i = 0; i < Courses.length; i++) {

        if (searchMode == 'name') {
            if (Courses[i].title.includes(value)) {
                results += `
                    <div class="col-12 col-sm-4">
                        <div class="card card1 mx-auto" style="width: 18rem;">
                            <img src="${Courses[i].imageUrl}" class="card-img-top" alt="${Courses[i].title} learning image">
                            <div class="font card-body z-1">
                                <h5 class="fw-bold">Course Name: ${Courses[i].title}</h5>
                                <p>Price: ${Courses[i].price}</p>
                                <p>Rating: ${Courses[i].rate}</p>
                                <p>Demand: ${Courses[i].demand}</p>
                                <div class="action d-flex justify-content-between align-items-center">
                                    <button class="btn btn-success" id="purchase-${Courses[i].id}" data-price="${Courses[i].price}" onclick="ADD(${Courses[i].id})">Order Now</button>
                                    <i id="favcolor-${Courses[i].id}" class="fas fa-heart ms-auto fs-4 text-secondary colorfav" onclick="fav(${Courses[i].id})"></i>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        } else {
            if (Courses[i].demand.includes(value)) {
                results += `
                    <div class="col-12 col-sm-4">
                        <div class="card card1 mx-auto" style="width: 18rem;">
                            <img src="${Courses[i].imageUrl}" class="card-img-top" alt="${Courses[i].title} learning image">
                            <div class="font card-body z-1">
                                <h5 class="fw-bold">Course Name: ${Courses[i].title}</h5>
                                <p>Price: ${Courses[i].price}</p>
                                <p>Rating: ${Courses[i].rate}</p>
                                <p>Demand: ${Courses[i].demand}</p>
                                <div class="action d-flex justify-content-between align-items-center">
                                    <button class="btn btn-success" id="purchase-${Courses[i].id}" data-price="${Courses[i].price}" onclick="ADD(${Courses[i].id})">Order Now</button>
                                    <i id="favcolor-${Courses[i].id}" class="fas fa-heart ms-auto fs-4 text-secondary colorfav" onclick="fav(${Courses[i].id})"></i>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        }
    }
    AllCourse.innerHTML = `<div class="row g-3 mb-3">${results}</div>`
}