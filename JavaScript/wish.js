let wishlist = document.getElementById('wishlist');
let wishcontainer = document.getElementById('wishcontainer');
let user = JSON.parse(localStorage.getItem('user'));
let mydesigners = document.getElementById('mydesigners');

if (user && user.isloggedin) {
  const status = document.querySelector('#s1');
  status.textContent = 'Sign Out.';
} else {
  const status = document.querySelector('#s1');
  status.textContent = 'Sign In.';
}

function cardCreater(item) {
  let div = document.createElement('div');
  div.className = 'cardstyle';
  let image = document.createElement('img');
  let designer = document.createElement('p');
  designer.className = 'maptags';
  let title = document.createElement('p');
  let price = document.createElement('p');
  title.className = 'maptags';
  price.className = 'maptags';
  let btn = document.createElement('button');
  btn.innerText = 'Move to Cart';
  btn.className = 'mabtnclass';
  btn.addEventListener('click', () => {
    window.location.href = 'bag.html';
    user.cart.push(item);
    let newwish = user.wishlist.filter((ele) => {
      return ele.id != item.id;
    });
    user.wishlist = newwish;
    localStorage.setItem('user', JSON.stringify(user));
    updater(user);
  });
  image.setAttribute('src', item.image);
  designer.innerText = item.designer;
  title.innerText = item.title;
  price.innerText = item.price;
  div.append(image, designer, title, price, btn);
  image.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('clickeditem', JSON.stringify(item));
    window.location.href = 'productdisplay.html';
  });
  return div;
}
console.log(user);
wishlist.addEventListener('click', () => {
  wishcontainer.innerHTML = '';
  user.wishlist.forEach((item) => {
    wishcontainer.append(cardCreater(item));
  });
});

let finaldata = JSON.parse(localStorage.getItem('products'));

mydesigners.addEventListener('click', () => {
  let ans = [];
  user.mydesigners.forEach((item) => {
    ans = ans.concat(
      finaldata.filter((ele) => {
        return ele.designer.toLowerCase().includes(item.toLowerCase());
      })
    );
  });
  wishcontainer.innerHTML = '';
  ans.forEach((item) => {
    wishcontainer.append(cardCreater(item));
  });
});

async function updater(user1) {
  try {
    let res = await fetch(
      `https://teesta-argument-014.onrender.com/users/${user1.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user1),
      }
    );
    let data = await res.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayCards(val) {
  console.log('working');
  window.location.href = 'new.html';
  localStorage.setItem('filtervalue', val);
}

function redirect(value) {
  localStorage.setItem('filtervalue', value);
  window.location.href = 'new.html';
}
