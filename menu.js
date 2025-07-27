
let lang = 'ru';
let cart = [];

const menuItems = [
  {
    name: 'Буррито',
    name_pl: 'Burrito',
    price: 29,
    img: 'Бурито.jpg'
  },
  {
    name: 'Миска Ацтека',
    name_pl: 'Miska Azteka',
    price: 35,
    img: '222.jpg'
  },
  {
    name: 'Кесадилья',
    name_pl: 'Quesadilla',
    price: 38,
    img: '33.jpg'
  },
  {
    name: 'Дос Такос',
    name_pl: 'Dos Tacos',
    price: 31,
    img: '11.jpg'
  },
  {
    name: 'Фахита',
    name_pl: 'Fajita',
    price: 30,
    img: '2222.jpg'
  },
  {
    name: 'Начос Суприм',
    name_pl: 'Nachos Supreme',
    price: 39,
    img: '2.jpg'
  }
];

function renderMenu() {
  const menuContainer = document.getElementById('menu');
  menuContainer.innerHTML = '';
  menuItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${lang === 'pl' ? item.name_pl : item.name}</h3>
      <p>${item.price} zł</p>
      <button onclick="addToCart(${index})">${lang === 'pl' ? 'Dodaj' : 'Добавить'}</button>
    `;
    menuContainer.appendChild(div);
  });
}

function addToCart(index) {
  const item = menuItems[index];
  const existing = cart.find(i => i.name === item.name);
  if (existing) {
    existing.count++;
  } else {
    cart.push({ ...item, count: 1 });
  }
  updateCart();
}

function updateCart() {
  const container = document.getElementById('cart');
  if (!container) return;
  container.innerHTML = '';
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = \`\${lang === 'pl' ? item.name_pl : item.name} × \${item.count} = \${item.count * item.price} zł
    <button onclick="removeFromCart(\${index})">✕</button>\`;
    container.appendChild(div);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function switchLang(selected) {
  lang = selected;
  renderMenu();
  updateCart();
}

function submitOrder() {
  if (cart.length === 0) return alert(lang === 'pl' ? 'Koszyk jest pusty' : 'Корзина пуста');

  const orderText = cart.map(item =>
    \`\${item.name} × \${item.count} = \${item.count * item.price} zł\`
  ).join('\n');

  const total = cart.reduce((sum, item) => sum + item.count * item.price, 0);

  const message = \`📦 Новый заказ AZTEK:\n\n\${orderText}\n\n💰 Итого: \${total} zł\`;

  fetch('https://api.telegram.org/bot7875371399:AAHyPpvRWtDPn6yHoGpNdGkyNRTuyltrh_0/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: '7903538631',
      text: message
    })
  }).then(res => {
    if (res.ok) {
      alert(lang === 'pl' ? 'Zamówienie zostało wysłane!' : 'Заказ отправлен!');
      cart = [];
      updateCart();
    } else {
      alert(lang === 'pl' ? 'Błąd podczas wysyłania!' : 'Ошибка отправки!');
    }
  });
}

window.onload = () => {
  renderMenu();
  updateCart();
};
