let signup = document.getElementById('signupbtn');

signup.addEventListener('click', (e) => {
  e.preventDefault();
  let userid = document.getElementById('signupemail').value;
  let pass1 = document.getElementById('signuppassword1').value;
  let cpass = document.getElementById('signuppassword2').value;
  let getSelectedValue;
  document.querySelectorAll('input[name="gender"]').forEach((ele) => {
    ele.addEventListener('click', () => {
      getSelectedValue = ele.value;
    });
  });
  if (pass1 === cpass) {
    let user = {
      usermail: userid,
      password: cpass,
      gender: getSelectedValue,
      cart: [],
      mydesigners: [],
      isloggedin: false,
      wishlist: [],
    };
    async function postdata() {
      let res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      let data = await res.json();
    }
    postdata();
    alert('Sign Up Sucessfull... Please Login!');
  } else {
    alert('create password and confirm password is not matching');
  }
});

let signin = document.getElementById('signin');

signin.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e);
  let signinmail = document.getElementById('signinmail').value;
  let password = document.getElementById('signinpass').value;

  async function fetchData(url) {
    try {
      let res = await fetch(url);
      let data = await res.json();
      let found = false;
      data.forEach((item) => {
        if (signinmail == item.usermail) {
          found = true;
          if (password === item.password) {
            alert('Login Sucessful...');
            item.isloggedin = true;
            //storing the user who logged in
            localStorage.setItem('user', JSON.stringify(item));
            window.location.href = 'index.html';
          } else {
            alert('Enter the correct Id Password!!!');
          }
        }
      });
      if (!found) {
        alert('user not found please create new account!');
      }
    } catch (error) {
      console.log(error);
    }
  }
  fetchData('http://localhost:3000/users');
});