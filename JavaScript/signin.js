document.addEventListener("DOMContentLoaded", () => {
  let signup = document.getElementById("signupbtn");

  signup.addEventListener("click", async (e) => {
    e.preventDefault();
    let userid = document.getElementById("signupemail").value.trim();
    let pass1 = document.getElementById("signuppassword1").value.trim();
    let cpass = document.getElementById("signuppassword2").value.trim();
    let getSelectedValue = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation checks
    if (!userid) {
      alert("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(userid)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!pass1 || !cpass) {
      alert("Please enter and confirm your password.");
      return;
    }

    if (pass1 !== cpass) {
      alert("Passwords do not match.");
      return;
    }

    if (!getSelectedValue) {
      alert("Please select Category.");
      return;
    }

    let user = {
      usermail: userid,
      password: cpass,
      gender: getSelectedValue,
      cart: [],
      mydesigners: [],
      isloggedin: false,
      wishlist: [],
    };

    try {
      let res = await fetch(
        "https://spotify-strategists-022.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (res.ok) {
        let data = await res.json();
        alert("Sign Up Successful... Please Login!");
      } else {
        alert("Error signing up. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error signing up. Please try again.");
    }
  });

  let signin = document.getElementById("signin");

  signin.addEventListener("click", async (e) => {
    e.preventDefault();
    let signinmail = document.getElementById("signinmail").value.trim();
    let password = document.getElementById("signinpass").value.trim();

    if (!signinmail || !password) {
      alert("Please enter both email and password.");
      return;
    }
    //spotify-strategists-022.onrender.com

    https: try {
      let res = await fetch(
        "https://spotify-strategists-022.onrender.com/users"
      );
      if (!res.ok) throw new Error("Failed to fetch users.");
      let data = await res.json();
      let foundUser = data.find((item) => signinmail === item.usermail);

      if (foundUser) {
        if (password === foundUser.password) {
          alert("Login Successful...");
          foundUser.isloggedin = true;
          localStorage.setItem("user", JSON.stringify(foundUser));
          window.location.href = "index.html";
        } else {
          alert("Enter the correct ID and password!");
        }
      } else {
        alert("User not found, please create a new account!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error logging in. Please try again.");
    }
  });
});
