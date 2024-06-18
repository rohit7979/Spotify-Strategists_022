let finaldata = JSON.parse(localStorage.getItem("products")) || [];
let user = JSON.parse(localStorage.getItem("user")) || {};
let arr;
let filtervalue = localStorage.getItem("filtervalue");
let s1 = document.getElementById("s1");

if (user && user.isloggedin) {
  const status = document.querySelector("#s1");
  status.textContent = "Sign Out.";
  status.innerText === "Sign Out." &&
    status.addEventListener("click", () => {
      localStorage.removeItem("user");
      status.textContent = "Sign In.";
    });
} else {
  const status = document.querySelector("#s1");
  status.textContent = "Sign In.";
}

async function fetchProducts(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    display(data);
    finaldata = data;
    arr = data;
    localStorage.setItem("products", JSON.stringify(data));

    console.log(filtervalue);
    if (filtervalue) {
      displayCards(filtervalue);
      localStorage.setItem("filtervalue", "");
    }
  } catch (error) {
    console.log(error);
  }
}

let newtotalvalue = document.getElementById("newtotalvalue");

function display(data) {
  newtotalvalue.innerHTML = `<p>${data.length} Items</p>`;
  newcardbox.innerHTML = "";
  data.forEach((item) => {
    newcardbox.append(cardCreater(item));
  });
}
fetchProducts("https://spotify-strategists-022.onrender.com/data");

let newcardbox = document.getElementById("newcardbox");

function cardCreater(item) {
  let div = document.createElement("div");
  div.className = "cardstyle";
  let image = document.createElement("img");
  let designer = document.createElement("p");
  designer.className = "maptags";
  let title = document.createElement("p");
  let price = document.createElement("p");
  title.className = "maptags";
  price.className = "maptags";

  image.setAttribute("src", item.image);
  designer.innerText = item.designer;
  title.innerText = item.title;
  price.innerText = `₹ ${item.price}`;
  div.append(image, designer, title, price);
  div.addEventListener("click", () => {
    localStorage.setItem("clickeditem", JSON.stringify(item));
    window.location.href = "productdisplay.html";
  });
  return div;
}
function redirect(value) {
  window.location.href = "new.html";
}
function displayCards(val) {
  localStorage.setItem("filtervalue", val);
  console.log(val);
  console.log(arr);
  let arr1;
  if (val === "new") {
    arr1 = arr.filter((ele) => {
      if (ele.new == "true") {
        return true;
      }
    });
    console.log(arr1, val);
    display(arr1);
  } else {
    arr1 = arr.filter((ele) => {
      if (ele.category === val) {
        return true;
      }
    });
    console.log(arr1);
    display(arr1);
  }
  localStorage.setItem("pagearr", JSON.stringify(arr1));
}

let designers = finaldata.map((item) => {
  return item.designer;
});
let finaldesigners = [...new Set(designers)];

finaldesigners.sort((a, b) => {
  return a - b;
});

finaldesigners.forEach((ele) => {
  let selection = document.getElementById("selection");
  let option = document.createElement("option");
  option.className = "optionfont";
  option.value = ele;
  option.textContent = ele.toUpperCase();
  selection.appendChild(option);
});

selection.addEventListener("change", (e) => {
  let ans1 = finaldata.filter((ele) => {
    return ele.designer == selection.value;
  });
  localStorage.setItem("pagearr", JSON.stringify(ans1));
  display(ans1);
});

let sorter1 = document.getElementById("sorter");

sorter1.addEventListener("change", (e) => {
  let pagearr = JSON.parse(localStorage.getItem("pagearr"));
  console.log(pagearr);
  let val = e.target.value;
  console.log(val);
  if (sorter1.value == "low") {
    pagearr.sort((a, b) => {
      return a.price - b.price;
    });

    display(pagearr);
  } else if (sorter1.value == "high") {
    pagearr.sort((a, b) => {
      return b.price - a.price;
    });
    display(pagearr);
  } else if (sorter1.value == "designer") {
    pagearr.sort((a, b) => {
      return a.designer.localeCompare(b.designer);
    });
    display(pagearr);
  }
});

let searchname = document.getElementById("searchname");
let searchbutton = document.getElementById("searchbutton");

searchbutton.addEventListener("click", (e) => {
  e.preventDefault();
  let value = searchname.value;
  let pagearr = arr;

  let ans1 = pagearr.filter((ele) => {
    return (
      ele.title.toLowerCase().includes(value) ||
      ele.designer.toLowerCase().includes(value)
    );
  });
  console.log(ans1);
  localStorage.setItem("pagearr", JSON.stringify(ans1));
  display(ans1);
});

let timeout;
const debounce = (delay) => {
  let value = searchname.value;
  if (value.length === 0) {
    console.log("Inside zero");
    display(finaldata);
    return;
  }
  if (value.length < 3) {
    return;
  }
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    searchbutton.click();
  }, delay);
};

searchname.addEventListener("input", () => {
  debounce(2000);
});
