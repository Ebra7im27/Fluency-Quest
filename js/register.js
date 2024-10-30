let fname = document.querySelector("#register-firstname")
let lname = document.querySelector("#register-lastname")
let email = document.querySelector("#register-email")
let password = document.querySelector("#register-password")
let registerbtn = document.querySelector("#register-button")

registerbtn.addEventListener("click", function (register) {
    register.preventDefault()
    if (fname.value === "" || lname.value === "" || email.value === "" || password.value === "") {
        alert("Please fill in all the required fields.")
    }
    else {
        localStorage.setItem("First Name", fname.value)
        localStorage.setItem("Last Name", lname.value)
        localStorage.setItem("Email", email.value)
        localStorage.setItem("Password", password.value)
        setTimeout(() => {
            window.location = "login.html"
        }, 1500)
    }
})
