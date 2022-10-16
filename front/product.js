const idLien = window.location.search.split("?").join("");
let id = idLien;
let val = 0;

let objectFinal = JSON.parse(localStorage.getItem("produit"));

const requeteListProducts =  fetch(`http://localhost:3000/api/products/${id}`);

//Affichage fiche produit
function ficheProduit() {
    requeteListProducts
    .then(function(res) {
        return res.json();
    })
    .then(function(value){

        produitPanier = value;
       /* delete produitPanier.price
        console.log(produitPanier)*/
        
        //Affichage de l'image du produit
        const imgblock = document.querySelector(".item__img");
        const imgProduct = document.createElement("img");
        imgProduct.src = value.imageUrl;
        imgProduct.alt = value.altTxt;
        imgblock.appendChild(imgProduct);
        
        //Affichage du nom du produit
        const nameProduct = document.getElementById("title");
        nameProduct.innerText = value.name;

        //Affichage du prix du produit
        const priceProduct = document.getElementById("price");
        priceProduct.innerText = value.price;

        //Affichage de la description du produit
        const descriptionProduct = document.getElementById("description");
        descriptionProduct.innerText = value.description;

        //Affichage de la couleur du produit
        const colors = document.getElementById("colors");

        const listColors = value.colors;
        for (let i = 0; i < listColors.length; i++) {
            const option1 = document.createElement("option");
            option1.value = listColors[i];
            option1.innerText = listColors[i];
            colorsPanier = colors.appendChild(option1);
            
           
        };
        
        ajouterPanier();   
        
    })
   
}

ficheProduit();

//Envoie des données dans le local storage

function ajouterPanier() {
    

    let select = document.getElementById("colors");

    console.log( select.innerText + " " + "je suis nouveau")

    let inputNumber = document.getElementById("quantity");
    
    let btnPanier = document.getElementById("addToCart");
    btnPanier.setAttribute("id", `${produitPanier._id}`);
    btnPanier.classList.add("addToCart");
   
    btnPanier.addEventListener("click", function() {
        
        
        if(inputNumber.value == 0 || inputNumber.value >= 100){
            
            alert("la quantité doit être comprise entre 1 et 100")
           
        }else{

            let objectFinal = JSON.parse(localStorage.getItem("produit"));
            
            delete produitPanier.price;
           /* delete produitPanier.name;
            delete produitPanier.altTxt;
            delete produitPanier.description;
            delete produitPanier.imageUrl;*/
            console.log(produitPanier)
        
            const fusionObjet = Object.assign({}, produitPanier,
                { couleur : `${select.value}` },
                { quantity : inputNumber.value },

            );

            /////////////////////////////////

            if (objectFinal == null) {

                //btnPanier.style.display = "display"

                objectFinal = [];
                objectFinal.push(fusionObjet);

                //vérification de la couleur
                if(fusionObjet.couleur == ""){
                    alert("veiller choisir une couleur")
                }else {
                    const divAjoutPanier = document.querySelector(".item__content__addButton");
                    const form = document.createElement("form");
                    form.appendChild(btnPanier);
                    form.action = "./cart.html";
                    divAjoutPanier.appendChild(form);
                    localStorage.setItem("produit", JSON.stringify(objectFinal));
                }
                
            }else if (objectFinal != null) {

                //vérification de la couleur
                if(fusionObjet.couleur == ""){
                    alert("veiller choisir une couleur")
                }else {
                    const divAjoutPanier = document.querySelector(".item__content__addButton");
                    const form = document.createElement("form");
                    form.appendChild(btnPanier);
                    form.action = "./cart.html";
                    divAjoutPanier.appendChild(form);
                    localStorage.setItem("produit", JSON.stringify(objectFinal));

                   // btnPanier.style.display = "display"

                    for (i = 0; i < objectFinal.length; i++) {

                        if ( objectFinal[i]._id == produitPanier._id && 
                            objectFinal[i].couleur == select.value  ) {
                            
                            let newQuantity = parseInt(objectFinal[i].quantity) + parseInt(inputNumber.value);
                            return (
                            
                                objectFinal[i].quantity = newQuantity,
                                //objectFinal[i].price = newPrice,
                                console.log(objectFinal[i].quantity),
                                localStorage.setItem("produit", JSON.stringify(objectFinal)),
                                objectFinal = JSON.parse(localStorage.getItem("produit"))
                            
                            )
                        }
                    }
                    for (let i = 0; i < objectFinal.length; i++) {
                        if ( (objectFinal[i]._id == produitPanier._id &&
                            objectFinal[i].couleur != select.value) ||
                            (objectFinal[i]._id != produitPanier._id) ) {
                                console.log("test dernier");
                            return ( 
                                console.log("test produit différent"),
                                objectFinal.push(fusionObjet),
                                localStorage.setItem("produit", JSON.stringify(objectFinal)),
                                objectFinal = JSON.parse(localStorage.getItem("produit"))
                                
                            )  
                                
                        }

                    }
                }
                
            }
            
       
        }  
    
    }) 

}; 



