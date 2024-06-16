let backpage = document.getElementById("backpage");
let user = JSON.parse(localStorage.getItem('user'));
let page = document.getElementById("ppage");
let item = JSON.parse(localStorage.getItem("clickeditem"));
productPageCreater(item);


if (user && user.isloggedin) {
  const status = document.querySelector('#s1');
  status.textContent = 'Sign Out.';
} else {
  const status = document.querySelector('#s1');
  status.textContent = 'Sign In.';
}

function redirect(value) {
  localStorage.setItem("filtervalue", value);
  window.location.href = "new.html";
}

function productPageCreater(item) {
  let div = document.createElement("div");
  div.className = "pcardstyle";
  let div22 = document.createElement("div");
  let div23 = document.createElement("div");
  let image = document.createElement("img");
  let designer = document.createElement("p");
  div23.className = "imghover1";
  designer.className = "maptags";
  let title = document.createElement("p");
  let price = document.createElement("p");
  title.className = "maptags";
  price.className = "maptags";

  image.setAttribute("src", item.image);
  designer.innerText = item.designer;
  title.innerText = item.title;
  price.innerText = `₹ ${item.price}`;

  let div2 = document.createElement("div");
  let btn1 = document.createElement("button");
  btn1.className = "btn1";
  let btn2 = document.createElement("button");
  btn2.className = "btn2";
  btn1.innerText = "ADD TO BAG";
  btn2.innerText = "Add To Wish List";
  btn1.addEventListener("click", () => {
    let user1 = JSON.parse(localStorage.getItem("user"));
    if (user1 && user1.isloggedin == true) {
      user1.cart.push(item);
      localStorage.setItem("user", JSON.stringify(user1));

      async function patchData(user1) {
        try {
          let res = await fetch(
            `https://teesta-argument-014.onrender.com/users/${user1.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(user1),
            }
          );
          let data = await res.json();
          alert("Added to cart!");
          window.location.href = "bag.html";
        } catch (error) {
          console.error("Error:", error);
        }
      }

      patchData(user1);
    } else {
      alert("Log in First!");
      window.location.href = "signinup.html";
    }
  });

  btn2.addEventListener("click", () => {
    let user1 = JSON.parse(localStorage.getItem("user"));
    if (user1 && user1.isloggedin === true) {
      user1.wishlist.push(item);
      localStorage.setItem("user", JSON.stringify(user1));
      async function patchData(user1) {
        try {
          let res = await fetch(
            `https://teesta-argument-014.onrender.com/users/${user1.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(user1),
            }
          );
          let data = await res.json();
          alert("Added to wishlist!");
        } catch (error) {
          console.error("Error:", error);
        }
      }

      patchData(user1);
    } else {
      alert("Log in First!");
      window.location.href = "signinup.html";
    }
  });

  div22.append(designer, title, price, btn1, btn2);
  div23.append(image);
  div.append(div23, div22);
  div2.append(div);

  page.append(div2);
}

backpage.addEventListener("click", () => {
  window.location.href = "new.html";
});

function displayCards(val) {
  localStorage.setItem("filtervalue", val);
  window.location.href = "new.html";
}
