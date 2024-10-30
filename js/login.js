let email = document.querySelector("#login-email")
let password = document.querySelector("#login-password")
let loginbtn = document.querySelector("#login-button")
let getemail = localStorage.getItem("Email")
let getpassword = localStorage.getItem("Password")

loginbtn.addEventListener("click", function (login) {
    login.preventDefault()
    if (email.value === "" || password.value === "") {
        alert("Please fill in all the required fields.")
    }
    else {
        if (getemail && getemail.toLocaleLowerCase() === email.value || getpassword && getpassword.toLocaleLowerCase() === password.value) {
            setTimeout(() => {
                window.location = "index.html"
            }, 1500);
        }
        else {
            alert("User Or Pass Is Wrong !")
        }
    }
})