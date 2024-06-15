let cart = JSON.parse(localStorage.getItem('user'));
if (!cart) {
  cart = { cart: [], wishlist: [] };
}

let user = JSON.parse(localStorage.getItem('user')) || {};
if (user && user.isloggedin) {
  const status = document.querySelector('#s1');
  status.textContent = 'Sign Out.';
} else {
  const status = document.querySelector('#s1');
  status.textContent = 'Sign In.';
}
let cartcontent = document.getElementById('Rcontainer-1');

document.getElementById(
  'count'
).innerHTML = `<h5>SHOPPING BAG (${getTotalQuantity(cart.cart)})</h5>`;

function cartcard(item) {
  let div = document.createElement('div');
  div.className = 'divbox1';
  let image = document.createElement('img');
  image.className = 'images';
  let title = document.createElement('h4');
  let a1 = document.createElement('a');
  let a2 = document.createElement('a');
  let price = document.createElement('p');
  let quantityInput = document.createElement('input');
  let div2 = document.createElement('div');
  div2.className = 'divbox2';

  image.setAttribute('src', item.image);
  title.innerText = item.title;
  a1.innerText = 'Move to Wish List';
  a1.setAttribute('id', 'mwl');
  a2.setAttribute('id', 'remove');
  a2.innerText = 'Remove';
  price.innerText = '₹' + item.price;
  quantityInput.type = 'number';
  quantityInput.value = item.quantity || 1;
  quantityInput.min = 1;
  quantityInput.addEventListener('change', () => {
    item.quantity = parseInt(quantityInput.value);
    updateCartQuantity();
  });

  div2.append(a1, a2);
  div.append(image, title, div2, price, quantityInput);

  a1.addEventListener('click', () => {
    moveItemToWishlist(item);
  });

  a2.addEventListener('click', () => {
    removeItemFromCart(item);
  });

  return div;
}

function getTotalQuantity(cart) {
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

function moveItemToWishlist(item) {
  cart.wishlist.push(item);
  removeItemFromCart(item);
  updater(cart);
}

function removeItemFromCart(item) {
  cart.cart = cart.cart.filter((item1) => item1.id !== item.id);
  localStorage.setItem('user', JSON.stringify(cart));
  updateCartUI();
  updater(cart);
}

function updateCartQuantity() {
  localStorage.setItem('user', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  cartcontent.innerHTML = '';
  let sum = 0;

  cart.cart.forEach((element) => {
    sum += element.price * (element.quantity || 1);
    cartcontent.append(cartcard(element));
  });

  document.getElementById('subtotal').innerText = '₹ ' + sum;
  document.getElementById('estimatedtotal').innerText = '₹ ' + sum;
  document.getElementById(
    'count'
  ).innerHTML = `<h5>SHOPPING BAG (${getTotalQuantity(cart.cart)})</h5>`;
}

function addItemToCart(item) {
  const existingItemIndex = cart.cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex !== -1) {
    cart.cart[existingItemIndex].quantity += 1;
  } else {
    item.quantity = 1;
    cart.cart.push(item);
  }

  localStorage.setItem('user', JSON.stringify(cart));
  updateCartUI();
  updater(cart);
}

updateCartUI();
let btncheckout = document.getElementById('btncheckout');
btncheckout.addEventListener('click', () => {
  cart.cart = [];
  localStorage.setItem('user', JSON.stringify(cart));
  updateCartUI();
  updater(cart);
  alert('Order Placed Sucessfully!');
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
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
function redirect(value) {
  localStorage.setItem('filtervalue', value);
  window.location.href = 'new.html';
}
