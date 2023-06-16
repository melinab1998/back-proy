const socketClient = io();

const products = document.getElementById("products");
const productName = document.getElementById("name");
const productDes = document.getElementById("des")
const productPrice = document.getElementById("price")
const productImg = document.getElementById("img")
const form = document.getElementById("form")
const form1 = document.getElementById("form1")


socketClient.on("productos", (array) =>{
    let infoProducts = "";
    array.forEach(p => {
        infoProducts += `<h2>${p.title}</h2>
                        <p>${p.description}</p>
                        <p>$${p.price}</p>
                        <img class="prod__img"src=${p.thumbnails} alt="">`
    });
    products.innerHTML = infoProducts;
})

form.onsubmit = (e) =>{
    e.preventDefault();
    const title = productName.value;
    const description = productDes.value;
    const price = productPrice.value;
    const thumbnails = productImg.value;
    socketClient.emit("newProduct", { title, description, price, thumbnails });
}

form1.onsubmit = (e) =>{
    e.preventDefault();
    const deleteProd = document.querySelector("#pD").value
    socketClient.emit("newProducts", deleteProd);
    document.querySelector("#pD").value = "";
}