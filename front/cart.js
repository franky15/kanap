let panier = JSON.parse(localStorage.getItem("produit"));
console.log(panier);


const prixTable = [];

let quantiteTotal = [];

const requeteListProductsPrice =  fetch("http://localhost:3000/api/products")
    .then( res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then( value => {
        tableObjetApi = value;
        console.log(tableObjetApi)


        // gestion du panier////////////////////////
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
                //displaySousTotal.innerText = `${panier[i].price}` * `${panier[i].quantity}` + "€";//* `${panier[i].quantity}`
                contenerDescrition.appendChild(displaySousTotal);
                prixTable.push(displaySousTotal.innerText);

                ///////////////////////////////////////

                //calcul sous total
                function  sousTotalPrice(){
                    for(let j = 0; j < tableObjetApi.length; j++){
                       
                         if(panier[i]._id == tableObjetApi[j]._id ){
                             console.log(tableObjetApi[j].name);
     
                             
                             displaySousTotal.innerText = tableObjetApi[j].price * `${panier[i].quantity}`+ "€" 
                            // console.log("nouveaux calcul")
                         }
                        
                     }
                }
                sousTotalPrice();

                ///////////////////////////////////////   


                // let takeQuantity = `${panier[i].price}`;
                    
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
                let input = document.createElement("input");
                input.type = "number";
                input.classList.add("itemQuantity");
                input.name = "itemQuantity";
                input.min = "0"; 
                input.max = "100"

    
                input.addEventListener("input", function(even){
                    valInput = even.target.value;
                    newQuantity = parseInt(valInput)

                    if(valInput >= 0 && valInput < 100) {
                        
                        panier[i].quantity = newQuantity
                       // displaySousTotal.innerText = panier[i].price * valInput + "€" 
                        /////////////////////////////////////////

                        //calcul sous total
                        function  sousTotalPrice(){
                            for(let j = 0; j < tableObjetApi.length; j++){
                            
                                if(panier[i]._id == tableObjetApi[j]._id ){
                                    console.log(tableObjetApi[j].name);
            
                                    
                                    displaySousTotal.innerText = tableObjetApi[j].price * valInput + "€" 
                                    // console.log("nouveaux calcul")
                                }
                                
                            }
                        }
                        sousTotalPrice();
                        //////////////////////////////////////

                        localStorage.setItem("produit", JSON.stringify(panier)); 
                        

                        ///////////////////////////////////////
                            // total du panier
                        let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
                        console.log("ce positionner")
                        
                        let totalFinal = 0
                        let tableauPrixSousTotal = []
                        for(let j = 0; j < sousTotalPrix.length; j++) {
                            const sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                            
                            tableauPrixSousTotal.push(sousTotalPrixChaineCaractère)
                            totalFinal += tableauPrixSousTotal[j]

                            for (let y = 0; y < tableauPrixSousTotal.length; y++) {
                                totalFinal += tableauPrixSousTotal[y]
                            
                                // total du panier
                                let grandTotal = document.querySelector("#totalPrice");

                                grandTotal.innerText = `${totalFinal}`
                                
                            }

                        }
                     
                        totalQuantity();
                        // total du panier
                        let grandTotal = document.querySelector("#totalPrice");
                     ///////////////////////////////////////

                        displayTotalPrixFinal()
                    }
                    else {
                        alert("la quantité doit être comprise entre 1 et 100")
                    }  
                    
                })
                ////////////////////////////////////////fin evenement
                
                ////////////////////////////////////////////////
                //quantité total
                function totalQuantity() {
                    //let dataStorage = JSON.parse(localStorage.getItem("produit"));
                    let tableQuantity =[]
                    for(let j = 0; j < panier.length; j++) { 
                        tableQuantity.push(panier[j].quantity); 
                    
                    }
              
                    let quantityTotal = 0;
                    for(let q = 0; q < tableQuantity.length; q++){
                        quantityTotal += parseInt(tableQuantity[q]);
                    }
                    let totalQuantity = document.getElementById("totalQuantity")
                    totalQuantity.innerText = quantityTotal;
                    
                   
                }
                totalQuantity();
                
                ////////////////////////////////////////////////
                
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

                    grandTotal.innerText =  totalFinal //`${totalFinal}`

                    
                }
                }
                //  displayTotalPrixFinal();
            
                    
                /////////////////////////////////////////////////
                input.value = panier[i].quantity;
                contenerQuantity.appendChild(input);

                

                //bouton supprimer
                const contenerDelete = document.createElement("div");
                contenerDelete.classList.add("cart__item__content__settings__delete")
                
                const btnDelete = document.createElement("p");

                btnDelete.innerHTML = `<p class="deleteItem" data-id="${panier[i]._id}" data-color="${panier[i].couleur}">Supprimer</p>`
                contenerDelete.appendChild(btnDelete);
                contenerQuantityInput.appendChild(contenerDelete);
                contenerInfoProduct.appendChild(contenerQuantityInput);

              
                ///////////////////////////////////////////////////////////////////////////////
                // let listBtnDelete = document.querySelectorAll(".deleteItem");
                function deleteProduct() {
                    
                    let listBtnDelete = document.querySelectorAll(".deleteItem");
                    for(let btn = 0; btn < listBtnDelete.length; btn++){

                        if(listBtnDelete[btn].dataset.id == panier[i]._id && 
                            listBtnDelete[btn].dataset.color == panier[i].couleur) {

                                listBtnDelete[btn].addEventListener("click", function(){
                                    soustraction();
                                    displayTotalPrixFinal();
                                    hiddenBasket();
                                    masqueFormulaire();
                                    totalQuantity();
                                   
                                        
                                })
                        }
                            
                    }
                 
                }
                deleteProduct()
                
                function soustraction(){
                    panier[i].quantity = 0
                    localStorage.setItem("produit", JSON.stringify(panier))
                    JSON.parse(localStorage.getItem("produit")),

                    input.value = panier[i].quantity,
                   // displaySousTotal.innerText = `${panier[i].price}` * `${panier[i].quantity}` + "€";
                    ////////////////////////////////////////////
                    //calcul sous total
                    function  sousTotalPrice(){
                        for(let j = 0; j < tableObjetApi.length; j++){
                        
                            if(panier[i]._id == tableObjetApi[j]._id ){
                                console.log(tableObjetApi[j].name);
        
                                
                                displaySousTotal.innerText = tableObjetApi[j].price * `${panier[i].quantity}`+ "€" 
                                // console.log("nouveaux calcul")
                            }
                            
                        }
                    }
                    sousTotalPrice();

                    ///////////////////////////////////////////

                }

                ///////////////////////////////////////////////////////////////////////////////  
                //masquage du produit dont l'input est null         
                function hiddenBasket() {

                    if( panier[i].quantity == 0){
                        const articleBasket = document.querySelectorAll(".cart__item");
                        for ( let m = 0; m < articleBasket.length; m++) {
                            if(articleBasket[m].dataset.id == panier[i]._id &&
                                articleBasket[m].dataset.color == panier[i].couleur ) {
                            
                                articleBasket[m].style.display = "none"
                                
                            }
                            
                        }
                    
                    }
                    
                }
                hiddenBasket()

                ////////////////////////////////////////////////
                
                
                //masquage du formulaire
                function masqueFormulaire() {
                    
                let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
                let grandTotal = document.querySelector("#totalPrice");
                        
                let totalFinal = 0
                for(let j = 0; j < sousTotalPrix.length; j++) {
                    let sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))

                    totalFinal += sousTotalPrixChaineCaractère;

                    grandTotal.innerText =  totalFinal;
                    
                }

                    
                    if(grandTotal.innerText == 0){
                    const blockFormulaire = document.querySelector(".cart__order");
                    blockFormulaire.style.display = "none";
                    localStorage.clear()
                    }
                }
                masqueFormulaire();
                
            }
            
        } 

        }
        affichagePanier();

        ////////////////////////////////////validation du formulaire/////////////////////////////

        let prenom = document.getElementById("firstName");
        let alertPrenom = document.getElementById("firstNameErrorMsg");

        let nom = document.getElementById("lastName");
        let alertNom = document.getElementById("lastNameErrorMsg");

        let adresse = document.getElementById("address");
        let alertAdresse = document.getElementById("addressErrorMsg");

        let ville = document.getElementById("city");
        let alertVille = document.getElementById("cityErrorMsg");

        let email = document.getElementById("email");
        let alertEmail = document.getElementById("emailErrorMsg");

        let formulaire = document.getElementById("cart__order__form")


        let inputNom, inputPrenom, inputAdresse, inputVille, inputEmail;


        ///////////////validation du prénom //////////////////

        prenom.addEventListener("input", function(even) {

        if(even.target.value == 0 ) {
            
            inputPrenom = null
            
        }
        if(even.target.value.match(/^[a-zA-Z-éèç ]{3,50}$/)) {
            // console.log(even.target.value);
            alertPrenom.style.display = "none";
            inputPrenom = even.target.value;
            
        }
        if(even.target.value.match(/[=+;"'&@#$€*_!ù%<>?)(§0-9]/)){
            console.log("pas de caractère spéciaux");
            alertPrenom.style.display = "block";
            alertPrenom.innerText = "votre prénom ne peut contenir de caractères spéciaux ni de chiffres";
            inputPrenom = null
        }

        })

        ///////////////validation du nom //////////////////

        nom.addEventListener("input", function(even) {
        if(even.target.value == 0 ) {
            
            inputNom = null
            
        }
        if(even.target.value.match(/^[a-z A-Z-éèç ]{2,50}$/)) {
            console.log("succès");
            console.log(even.target.value);
            alertNom.style.display = "none"
            inputNom = even.target.value;
            
            
        }
        if(even.target.value.match(/[=+;"'&@#$€*_!ù%<>?)(§0-9]/)){
            console.log("pas de caractère spéciaux");
            alertNom.style.display = "block";
            alertNom.innerText = "votre nom ne peut contenir de caractères spéciaux ni de chiffres";
            inputNom = null
        }

        })


        ///////////////validation de l'adresse //////////////////

        adresse.addEventListener("input", function(even) {
        if(even.target.value == 0 ) {
            
            inputAdresse = null
            
        }
        if(even.target.value.match(/[=+;"'&@#$€*_!ù%<>?)(§]/)){
            console.log("pas de caractère spéciaux");
            alertAdresse.style.display = "block";
            alertAdresse.innerText = "votre adresse ne peut contenir de caractères spéciaux sauf . , -";
            inputAdresse = null
        }
        if(even.target.value.match(/^([0-9 ]){2}([a-zA-Z-éèàç ]){5,60}$/)) {
                console.log("succès");
            console.log(even.target.value);
            alertAdresse.style.display = "none";
            inputAdresse = even.target.value;
            
        }

        })

        ///////////////validation de la ville //////////////////

        ville.addEventListener("input", function(even) {
        if(even.target.value == 0 ) {
            
            inputAdresse = null
            
        }
        if(even.target.value.match(/[=+;"'&@#$€*_!ù%<>?)(§]/)) {
            console.log("vide");
            alertVille.style.display = "block";
            alertVille.innerText = "votre ville ne peut contenir de chiffres ni de caractères spéciaux";
            inputVille = null
            
        }
        if(even.target.value.match(/^[a-zA-Z-éè0-9 ]{2,20}$/)) {
                console.log("succès");
            console.log(even.target.value);
            alertVille.style.display = "none";
            inputVille = even.target.value;
            
        }

        })

        ///////////////validation de l'email //////////////////


        email.addEventListener("input", function(even) {

        if(even.target.value == 0 ) {
            
            inputEmail = null
            
        }
        if(even.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) { 
            console.log("succès");
            console.log(even.target.value);
            alertEmail.style.display = "none";
            inputEmail = even.target.value;
            
        }

        })

        ///////////////////////////envoie formulaire///////////////////////
        formulaire.addEventListener("submit", function(e){
        e.preventDefault();
        console.log("post stoppé")
        if( inputPrenom && inputNom && inputAdresse && inputVille &&  inputEmail){ 
            console.log("tout est parfait on peut envoyer le formulaire");
            let commandeFinal = JSON.parse(localStorage.getItem("produit"));

            console.log(commandeFinal)

            let  products = [];
            for(let j = 0; j < commandeFinal.length; j++){
                if(commandeFinal[j].quantity != 0){
                    products.push(commandeFinal[j]._id)
                    // console.log(tableauProducts)
                }
            }

            console.log(products)
            
            const contact = {
                'firstName' : inputPrenom,
                'lastName' : inputNom,
                'address' : inputAdresse,
                'city' : inputVille,
                'email' : inputEmail
            }
            console.log(contact);
            console.log(products)

            const dataContact = {
                contact,
                    products
            }
            // console.log(dataContact.contact.firstName + " " + "objet")

            console.log(dataContact)
            
            fetch("http://localhost:3000/api/products/order", {
                method : "POST",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify(dataContact),
                
            })
            .then( response => response.json() )
            .then( promise => {
                console.log(promise.orderId + "mon order id")
                orderId = promise.orderId 
                localStorage.setItem("commandes", JSON.stringify(promise));
                document.location.href = `./confirmation.html?${orderId}`;
                
            })
            

        }else{
            alert("Erreur dans le formulaire veillez corriger")
            
        }


    })


})


/*
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
           // let takeQuantity = `${panier[i].price}`;


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
            let input = document.createElement("input");
            input.type = "number";
            input.classList.add("itemQuantity");
            input.name = "itemQuantity";
            input.min = "0"; 
            input.max = "100"

            input.addEventListener("input", function(even){
                valInput = even.target.value;
                newQuantity = parseInt(valInput)

                if(valInput >= 0 && valInput < 100) {
                   
                     panier[i].quantity = newQuantity
                     displaySousTotal.innerText = panier[i].price * valInput + "€" //`${panier[i].quantity}`

                     //localStorage.setItem("produit", JSON.stringify(panier)); /////
                     


                

                     // total du panier
                    let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
                    
                    let totalFinal = 0
                    let tableauPrixSousTotal = []
                    for(let j = 0; j < sousTotalPrix.length; j++) {
                        const sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                        
                        tableauPrixSousTotal.push(sousTotalPrixChaineCaractère)
                        totalFinal += tableauPrixSousTotal[j]

                        for (let y = 0; y < tableauPrixSousTotal.length; y++) {
                            totalFinal += tableauPrixSousTotal[y]
                        
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

                    grandTotal.innerText =  totalFinal //`${totalFinal}`

                    
                }
             }
             displayTotalPrixFinal();
            
             
           /////////////////////////////////////////////////
            input.value = panier[i].quantity;
            contenerQuantity.appendChild(input);

            

            //bouton supprimer
            const contenerDelete = document.createElement("div");
            contenerDelete.classList.add("cart__item__content__settings__delete")
           
            const btnDelete = document.createElement("p");

            btnDelete.innerHTML = `<p class="deleteItem" data-id="${panier[i]._id}" data-color="${panier[i].couleur}">Supprimer</p>`
            contenerDelete.appendChild(btnDelete);
            contenerQuantityInput.appendChild(contenerDelete);
            contenerInfoProduct.appendChild(contenerQuantityInput);

            ///////////////////////////////////////////////////////////////////////////////
           // let listBtnDelete = document.querySelectorAll(".deleteItem");
            function deleteProduct() {
               
                let listBtnDelete = document.querySelectorAll(".deleteItem");
                for(let btn = 0; btn < listBtnDelete.length; btn++){

                    if(listBtnDelete[btn].dataset.id == panier[i]._id && 
                        listBtnDelete[btn].dataset.color == panier[i].couleur) {

                            listBtnDelete[btn].addEventListener("click", function(){
                                soustraction()
                                displayTotalPrixFinal()
                                hiddenBasket()
                                masqueFormulaire()
                                    
                            })
                    }
                       
                }
                
            }
            deleteProduct()
          
            function soustraction(){
                panier[i].quantity = 0
                localStorage.setItem("produit", JSON.stringify(panier))
                JSON.parse(localStorage.getItem("produit")),

                input.value = panier[i].quantity,
                displaySousTotal.innerText = `${panier[i].price}` * `${panier[i].quantity}` + "€";

            }

            ///////////////////////////////////////////////////////////////////////////////  
            //masquage du produit dont l'input est null         
            function hiddenBasket() {

                if( panier[i].quantity == 0){
                    const articleBasket = document.querySelectorAll(".cart__item");
                    for ( let m = 0; m < articleBasket.length; m++) {
                        if(articleBasket[m].dataset.id == panier[i]._id &&
                            articleBasket[m].dataset.color == panier[i].couleur ) {
                        
                            articleBasket[m].style.display = "none"
                            
                        }
                       
                    }
               
                }
               
            }
            hiddenBasket()

           ////////////////////////////////////////////////
           
           
           //masquage du formulaire
           function masqueFormulaire() {
               
            let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
            let grandTotal = document.querySelector("#totalPrice");
                    
            let totalFinal = 0
            for(let j = 0; j < sousTotalPrix.length; j++) {
                let sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))

                totalFinal += sousTotalPrixChaineCaractère;

                grandTotal.innerText =  totalFinal;
                
            }
                if(grandTotal.innerText == 0){
                const blockFormulaire = document.querySelector(".cart__order");
                blockFormulaire.style.display = "none";
                localStorage.clear()
                }
            }
            masqueFormulaire();
            
        }
        
    } 
    
}
affichagePanier();

////////////////////////////////////validation du formulaire/////////////////////////////

let prenom = document.getElementById("firstName");
let alertPrenom = document.getElementById("firstNameErrorMsg");

let nom = document.getElementById("lastName");
let alertNom = document.getElementById("lastNameErrorMsg");

let adresse = document.getElementById("address");
let alertAdresse = document.getElementById("addressErrorMsg");

let ville = document.getElementById("city");
let alertVille = document.getElementById("cityErrorMsg");

let email = document.getElementById("email");
let alertEmail = document.getElementById("emailErrorMsg");

let formulaire = document.getElementById("cart__order__form")


let inputNom, inputPrenom, inputAdresse, inputVille, inputEmail;


///////////////validation du prénom //////////////////

prenom.addEventListener("input", function(even) {
    
    if(even.target.value == 0 ) {
        
        inputPrenom = null
       
    }
    if(even.target.value.match(/^[a-zA-Z-éèç ]{3,50}$/)) {
       // console.log(even.target.value);
        alertPrenom.style.display = "none";
        inputPrenom = even.target.value;
       
    }
    if(even.target.value.match(/[=+;"'&@#$€*_!ù%<>?)(§0-9]/)){
        console.log("pas de caractère spéciaux");
        alertPrenom.style.display = "block";
        alertPrenom.innerText = "votre prénom ne peut contenir de caractères spéciaux ni de chiffres";
        inputPrenom = null
    }
   
})

///////////////validation du nom //////////////////

nom.addEventListener("input", function(even) {
    if(even.target.value == 0 ) {
        
        inputNom = null
      
    }
    if(even.target.value.match(/^[a-z A-Z-éèç ]{2,50}$/)) {
        console.log("succès");
        console.log(even.target.value);
        alertNom.style.display = "none"
       inputNom = even.target.value;
      
       
    }
    if(even.target.value.match(/[=+;"'&@#$€*_!ù%<>?)(§0-9]/)){
        console.log("pas de caractère spéciaux");
        alertNom.style.display = "block";
        alertNom.innerText = "votre nom ne peut contenir de caractères spéciaux ni de chiffres";
        inputNom = null
    }
   
})


///////////////validation de l'adresse //////////////////

adresse.addEventListener("input", function(even) {
    if(even.target.value == 0 ) {
       
        inputAdresse = null
       
    }
    if(even.target.value.match(/[=+;"'&@#$€*_!ù%<>?)(§]/)){
        console.log("pas de caractère spéciaux");
        alertAdresse.style.display = "block";
        alertAdresse.innerText = "votre adresse ne peut contenir de caractères spéciaux sauf . , -";
        inputAdresse = null
    }
    if(even.target.value.match(/^([0-9 ]){2}([a-zA-Z-éèàç ]){5,60}$/)) {
         console.log("succès");
        console.log(even.target.value);
        alertAdresse.style.display = "none";
        inputAdresse = even.target.value;
       
    }
   
})

///////////////validation de la ville //////////////////

ville.addEventListener("input", function(even) {
    if(even.target.value == 0 ) {
       
        inputAdresse = null
       
    }
    if(even.target.value.match(/[=+;"'&@#$€*_!ù%<>?)(§0-9]/)) {
        console.log("vide");
        alertAdresse.style.display = "block";
        alertVille.innerText = "votre ville ne peut contenir de chiffres ni de caractères spéciaux";
        inputVille = null
       
    }
    if(even.target.value.match(/^[a-zA-Z-éè ]{2,20}$/)) {
         console.log("succès");
        console.log(even.target.value);
        alertVille.style.display = "none";
        inputVille = even.target.value;
       
    }
   
})
  
///////////////validation de l'email //////////////////


email.addEventListener("input", function(even) {
    
    if(even.target.value == 0 ) {
        
        inputEmail = null
       
    }
    if(even.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) { 
        console.log("succès");
        console.log(even.target.value);
        alertEmail.style.display = "none";
        inputEmail = even.target.value;
       
    }
   
})
 
///////////////////////////envoie formulaire///////////////////////
formulaire.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("post stoppé")
    if( inputPrenom && inputNom && inputAdresse && inputVille &&  inputEmail){ 
        console.log("tout est parfait on peut envoyer le formulaire");
        let commandeFinal = JSON.parse(localStorage.getItem("produit"));

       console.log(commandeFinal)

        let  products = [];
        for(let j = 0; j < commandeFinal.length; j++){
            if(commandeFinal[j].quantity != 0){
                products.push(commandeFinal[j]._id)
               // console.log(tableauProducts)
            }
        }

       console.log(products)
      
        const contact = {
            'firstName' : inputPrenom,
            'lastName' : inputNom,
            'address' : inputAdresse,
            'city' : inputVille,
            'email' : inputEmail
        }
        console.log(contact);
        console.log(products)

        const dataContact = {
            contact,
             products
        }
       // console.log(dataContact.contact.firstName + " " + "objet")

        console.log(dataContact)
        
        fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(dataContact),
           
        })
        .then( response => response.json() )
        .then( promise => {
            console.log(promise.orderId + "mon order id")
            orderId = promise.orderId 
            localStorage.setItem("commandes", JSON.stringify(promise));
            document.location.href = `./confirmation.html?${orderId}`;
            
        })
        

    }else{
       alert("Erreur dans le formulaire veillez corriger")
       
    }
   
    
})
*/
