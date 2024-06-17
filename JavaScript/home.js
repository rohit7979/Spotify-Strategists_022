function displayCards(val) {
  localStorage.setItem("filtervalue", val);
  window.location.href = "new.html";
}

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
