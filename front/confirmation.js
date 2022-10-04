let idOrder = location.search.split("?").join("");

const orderId = document.querySelector("#orderId");
orderId.innerText = `${idOrder}`

localStorage.clear();