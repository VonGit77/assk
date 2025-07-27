
const menuData = [
  {
    id: 1,
    name: { ru: "Буррито", pl: "Burrito" },
    description: {
      ru: "Пшеничная тортилья с мясом, рисом, фасолью и сальсой.",
      pl: "Pszenna tortilla z mięsem, ryżem, fasolą i salsą."
    },
    price: 29,
    image: "Бурито.jpg"
  },
  {
    id: 2,
    name: { ru: "Миска Ацтека", pl: "Miska Azteka" },
    description: {
      ru: "Мясо, сыр, овощи и чипсы из тортильи с рисом.",
      pl: "Mięso, ser, warzywa i chipsy z tortilli z ryżem."
    },
    price: 35,
    image: "33.jpg"
  },
  {
    id: 3,
    name: { ru: "Кесадилья", pl: "Quesadilla" },
    description: {
      ru: "Тортилья с мясом, сыром и овощами, обжаренная до хруста.",
      pl: "Tortilla z mięsem, serem i warzywami, grillowana."
    },
    price: 38,
    image: "2222.jpg"
  },
  {
    id: 4,
    name: { ru: "Тако", pl: "Dos Tacos" },
    description: {
      ru: "Два тако с мясом, сыром, сальсой и овощами.",
      pl: "Dwa tacos z mięsem, serem, salsą i warzywami."
    },
    price: 31,
    image: "11.jpg"
  },
  {
    id: 5,
    name: { ru: "Фахита", pl: "Fajita" },
    description: {
      ru: "Блюдо с мясом и овощами на тортилье, подается со сметаной.",
      pl: "Mięso i warzywa w tortilli, podawane ze śmietaną."
    },
    price: 30,
    image: "222.jpg"
  },
  {
    id: 6,
    name: { ru: "Чили кон карне", pl: "Chili con Carne" },
    description: {
      ru: "Острый говяжий гуляш с фасолью и томатами.",
      pl: "Ostry gulasz wołowy z fasolą i pomidorami."
    },
    price: 32,
    image: "2.jpg"
  }
];

let currentLang = "ru";

function renderMenu() {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";
  menuData.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-item";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name[currentLang]}" />
      <h3>${item.name[currentLang]}</h3>
      <p>${item.description[currentLang]}</p>
      <strong>${item.price} zł</strong><br/>
      <button onclick="addToCart(${item.id})">${currentLang === "ru" ? "Добавить" : "Dodaj"}</button>
    `;
    container.appendChild(card);
  });
}

function setLang(lang) {
  currentLang = lang;
  document.getElementById("title").textContent = lang === "ru" ? "Меню" : "Menu";
  document.getElementById("cart-title").textContent = lang === "ru" ? "Корзина" : "Koszyk";
  document.getElementById("submit-order").textContent = lang === "ru" ? "Оформить заказ" : "Złóż zamówienie";
  renderMenu();
  renderCart();
}

const cart = [];

function addToCart(id) {
  const item = menuData.find(m => m.id === id);
  cart.push(item);
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-list");
  const total = document.getElementById("cart-total");
  list.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name[currentLang] + " - " + item.price + " zł";
    list.appendChild(li);
    sum += item.price;
  });
  total.textContent = currentLang === "ru" ? `Итого: ${sum} zł` : `Razem: ${sum} zł`;
}

function submitOrder() {
  if (cart.length === 0) return alert(currentLang === "ru" ? "Корзина пуста!" : "Koszyk jest pusty!");
  let text = "Новый заказ Aztek:%0A";
  cart.forEach(item => {
    text += `• ${item.name[currentLang]} - ${item.price} zł%0A`;
  });
  const url = `https://t.me/share/url?url=&text=${text}`;
  window.open(url, "_blank");
}
renderMenu();
