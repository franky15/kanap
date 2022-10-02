const requeteListProducts =  fetch("http://localhost:3000/api/products");


function affichageProduits() {
    //récupération de la liste des produits de l'API //

    requeteListProducts
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        //Récupération des différents critères des objets de la liste et affichage//
        //   de tous les produits de la liste //

        const listProducts = value;
        for (let i = 0; i < listProducts.length; i++) {
            let linkProduct = document.createElement("a");
            linkProduct.className = "lienProduct";
            linkProduct.id = ` "${listProducts[i]._id}"`;
            linkProduct.href = `./product.html?${listProducts[i]._id}`;
             
            let itemsProducts = document.getElementById("items");
            let article = document.createElement("article");
    
            const imageProduct = document.createElement("img");
            imageProduct.src = listProducts[i].imageUrl;
            imageProduct.alt = listProducts[i].altTxt;
            article.appendChild(imageProduct);
    
            const nameProduct = document.createElement("h3");
            nameProduct.innerText = listProducts[i].name;
            article.appendChild(nameProduct);
    
            const descriptionProduct = document.createElement("p");
            descriptionProduct.innerText = listProducts[i].description;
            article.appendChild(descriptionProduct);
            
            linkProduct.appendChild(article)
            itemsProducts.appendChild(linkProduct);
            
            
        }
        
    })
    .catch(function(err) {
        const error = "Une erreur est survenue" + " " + err;
    return  error;
    });
    
}

affichageProduits();












