let panier = JSON.parse(localStorage.getItem("produit"));

const prixTable = [];

let quantiteTotal = []

// gestion du panier
async function affichagePanier() {
   
    if (panier) {   
        await panier;

        for ( let i = 0; i < panier.length; i++) {
           

            const panierItems = document.getElementById("cart__items");

            const article = document.createElement("article");
            article.dataset.id = panier[i]._id
            article.dataset.color = panier[i].couleur
            article.classList = "cart__item"
           
            const imageContener = document.createElement("div");
            imageContener.classList.add("cart__item__img");

            const imageProduct = document.createElement("img");
            imageProduct.src = `${panier[i].imageUrl}`;
            imageProduct.alt = `${panier[i].altTxt}`;
            imageContener.appendChild(imageProduct);
            article.appendChild(imageContener);
            panierItems.appendChild(article);

            //creation des contener nom du produit, couleur et prix
            const contenerInfoProduct = document.createElement("div");
            contenerInfoProduct.classList.add("cart__item__content");
            const contenerDescrition = document.createElement("div");
            contenerDescrition.classList.add("cart__item__content__description");

            //affichage du nom du produit
            const nameProduct = document.createElement("h2");
            nameProduct.innerText = `${panier[i].name}`;
            contenerDescrition.appendChild(nameProduct); 
            contenerInfoProduct.appendChild(contenerDescrition);
            article.appendChild(contenerInfoProduct);

            //affichage de la couleur
            const colorsProduct = document.createElement("p");
            colorsProduct.innerText = `${panier[i].couleur}`;
            contenerDescrition.appendChild(colorsProduct);
            ///////////////////////////////////////////////////////////////////
            //affichage du prix
            const displaySousTotal = document.createElement("p");
            displaySousTotal.classList.add("sousTotalPrix");
            displaySousTotal.dataset.id = panier[i]._id;
            displaySousTotal.dataset.color = panier[i].couleur;
            let takeQuantity = `${panier[i].price}`;


            displaySousTotal.innerText = `${panier[i].price}` * `${panier[i].quantity}` + "€";//* `${panier[i].quantity}`
            contenerDescrition.appendChild(displaySousTotal);
            prixTable.push(displaySousTotal.innerText);
             
            ///////////////////////////////////////////////////////////////////
            //creation des contener pour la quantité, input et le bouton supprimer
            const contenerQuantityInput = document.createElement("div");
            contenerQuantityInput.classList.add("cart__item__content__settings");
            const contenerQuantity = document.createElement("div");
            contenerQuantity.classList.add("cart__item__content__settings__quantity");

            //valeur de input quantité
            const affichageInput = document.createElement("p");
            affichageInput.innerText = "Qté :";
            contenerQuantity.appendChild(affichageInput);
            contenerInfoProduct.appendChild(contenerQuantity);

            // input
            const input = document.createElement("input");
            input.type = "number";
            input.classList.add("itemQuantity");
            input.name = "itemQuantity";
            input.min = "1";
            input.max = "100"

            input.addEventListener("input", function(even){
                valInput = even.target.value;
                newQuantity = parseInt(valInput)

                if(valInput >= 1 && valInput < 100) {
                   
                     panier[i].quantity = newQuantity
                     displaySousTotal.innerText = `${panier[i].price}` * valInput + "€" //`${panier[i].quantity}`

                     localStorage.setItem("produit", JSON.stringify(panier));
                     
                     // total du panier
                    let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
                    
                    let totalFinal = 0
                    let tableauPrixSousTotal = []
                    for(let j = 0; j < sousTotalPrix.length; j++) {
                        const sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                        
                        tableauPrixSousTotal.push(sousTotalPrixChaineCaractère)
                        totalFinal += tableauPrixSousTotal[j]

                        console.log( totalFinal + " " + "avant")

                        for (let y = 0; y < tableauPrixSousTotal.length; y++) {
                            totalFinal += tableauPrixSousTotal[y]
                            console.log( totalFinal + " " + "apres")
                            // total du panier
                            let grandTotal = document.querySelector("#totalPrice");

                            grandTotal.innerText = `${totalFinal}`
                            
                        }

                    }
                    
                    // total du panier
                    let grandTotal = document.querySelector("#totalPrice");

                    displayTotalPrixFinal()
                }
                else {
                    alert("la quantité doit être comprise entre 1 et 100")
                }  
                
            })
           ////////////////////////////////////////fin evenement
          
          
             // Affichage du totalFinal du panier
             function displayTotalPrixFinal() {
                let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
                    
                let totalFinal = 0
                let tableauPrixSousTotal = []
                for(let j = 0; j < sousTotalPrix.length; j++) {
                    const sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                    
                    tableauPrixSousTotal.push(sousTotalPrixChaineCaractère)
                    totalFinal += tableauPrixSousTotal[j]
                    let grandTotal = document.querySelector("#totalPrice");

                    grandTotal.innerText = `${totalFinal}`

                    
                    
                }
             }
             displayTotalPrixFinal()

             
           /////////////////////////////////////////////////
            input.value = panier[i].quantity;
            contenerQuantity.appendChild(input);

            //bouton supprimer
            const contenerDelete = document.createElement("div");
            contenerDelete.classList.add("cart__item__content__settings__delete")
           
            const btnDelete = document.createElement("p");
           // btnDelete.classList.add("deleteItem")  
           // btnDelete.dataset.id = panier[i]._id
           // btnDelete.dataset.color = panier[i].couleur

            btnDelete.innerHTML = `<p class="deleteItem" data-id="${panier[i]._id}" data-color="${panier[i].couleur}">Supprimer</p>`
            contenerDelete.appendChild(btnDelete);
            contenerQuantityInput.appendChild(contenerDelete);
            contenerInfoProduct.appendChild(contenerQuantityInput);

            ///////////////////////////////////////////////////////////////////////////////
            let listBtnDelete = document.querySelectorAll(".deleteItem");
            function deleteProduct() {
               
               // let listBtnDelete = document.querySelectorAll(".deleteItem");
                for(let btn = 0; btn < listBtnDelete.length; btn++){

                    if(listBtnDelete[btn].dataset.id == panier[i]._id && 
                        listBtnDelete[btn].dataset.color == panier[i].couleur) {

                            listBtnDelete[btn].addEventListener("click", function(){
                                let btnDelete = panier.filter(produit => produit._id != listBtnDelete[btn].dataset.id &&
                                produit.couleur != listBtnDelete[btn].dataset.color);
                                console.log(btnDelete + " " + "filtre")
                                panier[i].quantity = 0
                                input.value = panier[i].quantity
                                   
                                ///////////////////////////////////////////////////////
                                    //traitement du nouveau prix total
                                   
                                   
                                       let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
                                            
                                        let totalFinal = 0
                                        let tableauPrixSousTotal = []
                                        for(let j = 0; j < sousTotalPrix.length; j++) {
                                            const sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                                            
                                            tableauPrixSousTotal.push(sousTotalPrixChaineCaractère)
                                            totalFinal += tableauPrixSousTotal[j]
                                            let grandTotal = document.querySelector("#totalPrice");
                        
                                            grandTotal.innerText = `${totalFinal}`
                                            
                                        }

                                         //soustraction
                                
                                        for(let j = 0; j < sousTotalPrix.length; j++) {
                                            const sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))

                                            if(listBtnDelete[btn].dataset.id == sousTotalPrix[j].dataset.id && 
                                                listBtnDelete[btn].dataset.color == sousTotalPrix[j].dataset.color ) {
                                                    
                                                totalFinal -= sousTotalPrixChaineCaractère 

                                                let grandTotal = document.querySelector("#totalPrice");

                                                grandTotal.innerText = totalFinal
                                                // masqueFormulaire()
                                                                
                                            }
                                           
                                        }
                                   
                                        hiddenBasket()
                                       // masqueFormulaire()
                                 
                                localStorage.setItem("produit", JSON.stringify(panier))
                               return JSON.parse(localStorage.getItem("produit"))
                                    
                            })
                    }
                       
                }
                
            }
            deleteProduct()
           

            ///////////////////////////////////////////////////////////////////////////////  
            //masquage du produit dont l'input est null         
            function hiddenBasket() {
            
               // const articleBasket = document.querySelectorAll(".cart__item");
                
              //  console.log(articleBasket)

                if( panier[i].quantity == 0){
                    const articleBasket = document.querySelectorAll(".cart__item");
                    for ( let m = 0; m < articleBasket.length; m++) {
                        if(articleBasket[m].dataset.id == panier[i]._id &&
                            articleBasket[m].dataset.color == panier[i].couleur ) {
                            console.log("masquer panier")
                            console.log(articleBasket[m])
                            articleBasket[m].style.display = "none"
                            
                        }
                        masqueFormulaire()
                    }
               /* for ( let m = 0; m < articleBasket.length; m++) {
                    if(articleBasket[m].dataset.id == panier[i]._id &&
                        articleBasket[m].dataset.color == panier[i].couleur ) {
                            console.log("masquer panier")
                            console.log(articleBasket[m])
                           articleBasket[m].style.display = "none"
                            
                    }*/
                }
               
               
            }
            hiddenBasket()

           ////////////////////////////////////////////////
           
           //masquage du formulaire
           function masqueFormulaire() {
            
                let grandTotal = document.querySelector("#totalPrice");
                console.log( grandTotal.innerText + " " + "mon grand total tes")
                if(grandTotal.innerText == 0){
                const blockFormulaire = document.querySelector(".cart__order");
                blockFormulaire.style.display = "none"
                }
            }

            masqueFormulaire()
          
        }
        
    } 
}
affichagePanier()



//validation forfulaire 

/*


/////////////////////////////////////////////////

function firstNameValidation() {

    //validation nom 
    const firstName = document.querySelector("#firstName");
    const alerteFirstname = document.querySelector("#firstNameErrorMsg")
    
    var firstNameNameReg = new RegExp(/^[a-zA-Z- ]{1,100}$/)
    var firstNameNameTest = firstName.value
    if(!firstNameNameTest.match(firstNameNameReg)) {
        alerteFirstname.style.display = "block"
        alerteFirstname.innerText = "votre prénom doit contenir que des lettres et au maximum 100 "
    }
}

function lastNameValidation(){

    //validation prénom
    const lastName = document.querySelector("#lastName");
    const alertlastName = document.querySelector("#flastNameErrorMsg")

    var lastNameReg = new RegExp(/^[a-zA-Z- ]{1,100}$/)
    var lastNameTest = lastName.value
    if(!lastNameTest.match(lastNameReg)) {
        alertlastName.style.display = "block"
        alertlastName.innerText= "votre Nom doit contenir que des lettres et au maximum 100 "
    }
}

function adresse(){

    //validation adresse
    const adresse = document.querySelector("#address");
    const alertadresse = document.querySelector("#addressErrorMsg")

    var adresseReg = new RegExp(/^[0-9]{1,5}[[a-zA-Z- ]{1,100}$/)
    var adresseTest = adresse.value
    if(!adresseTest.match(adresseReg)) {
        adresse.style.display = "block"
        alertadresse.innerText = "votre code postal doit contenir que des chiffres et au maximum 10 chiffres "
    }
}

function city(){

    //validation ville
    const city = document.querySelector("#city");
    const alertCity = document.querySelector("#cityErrorMsg")

    var cityReg = new RegExp(/^[[a-zA-Z-]{1,50}$/)
    var cityTest = city.value
    if(!cityTest.match(cityReg)) {
        city.style.display = "block"
        alertCity.innerText = "votre code postal doit contenir que des chiffres et au maximum 10 chiffres "
    }
}

    
function emailValidation() {
   
    //validation mail
    var email = document.querySelector("#email");
    var alerteEmail = document.querySelector("#emailErrorMsg");

    var emailTest = email.value;
    var emailReg = new RegExp(/^[a-zA-Z0-9._-]{1,64}@[a-zA-Z0-9-]{1,252}[a-zA-Z.]{2,6}$/);
    if (!emailTest.match(emailReg )) {
        alerteEmail.style.display = "block"
        alerteEmail.innerText = "votre email ne respecte pas les normes "
    }
}

//Lien vers la page de confirmation
function validationFormulaire() {
    const formulaire = document.querySelector(".cart__order__form");
    formulaire.action = "./confirmation.html"
}



const commander = document.querySelector("#order")
commander.addEventListener("click", function(even){
    even.preventDefault()
    firstNameValidation()
    lastNameValidation()
    adresse()
    city()
    emailValidation()
    //validationFormulaire()
})
*/

/*
function validationForm(){

    //validation nom 
    const firstName = document.querySelector("#firstName");
    const alerteFirstname = document.querySelector("#firstNameErrorMsg")
    
    var firstNameNameReg = new RegExp(/^[a-zA-Z-]{1,100}$/)
    var firstNameNameTest = firstName.value
    if(!firstNameNameTest.match(firstNameNameReg)) {
        alerteFirstname.style.display = "block"
        alerteFirstname.innerText("votre prénom doit contenir que des lettres et au maximum 100 ")
    }else{ 
        //validation prénom
        const lastName = document.querySelector("#lastName");
        const alertlastName = document.querySelector("#flastNameErrorMsg")

        var lastNameReg = new RegExp(/^[a-zA-Z-]{1,100}$/)
        var lastNameTest = lastName.value
        if(!lastNameTest.match(lastNameReg)) {
            alertlastName.style.display = "block"
            alertlastName.innerText("votre Nom doit contenir que des lettres et au maximum 100 ")
        }else{
            //validation ville
            const city = document.querySelector("#city");
            const alertCity = document.querySelector("#cityErrorMsg")
        
            var cityReg = new RegExp(/^[0-9]{1,10}$/)
            var cityTest = city.value
            if(!cityTest.match(cityReg)) {
                alertCity.style.display = "block"
                alertCity.innerText("votre code postal doit contenir que des chiffres et au maximum 10 chiffres ")
            } else{
                const email = document.querySelector("#email");
                const alerteEmail = document.querySelector("#emailErrorMsg");
                const emailTest = email.value;
                var emailReg = new RegExp(/^[a-zA-Z0-9._-]{1,64}@([a-zA-Z0-9-]{2,252}\.[a-zA-Z.]{2,6}){5,255}/);
                var emailTest = email.value;
                if (!inputUser.match(emailReg )) {
                    //return false
                    alerteEmail.style.display = "block"
                    alerteEmail.innerText("votre email ne respecte pas les normes ")
                    
                }else{
                    //Lien vers la page de confirmation
                    function validationFormulaire() {
                        const formulaire = document.querySelector(".cart__order__form");
                        formulaire.action = "./confirmation.html"
                    }
                    const commander = document.querySelector("#order")
                    commander.addEventListener("click", function(){
    
                        validationForm()
                    })
                }
            }
       
    }
    
}
*/
