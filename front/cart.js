let panier = JSON.parse(localStorage.getItem("produit"));
console.log(panier);


const prixTable = [];

let quantiteTotal = [];

const requeteListProductsPrice =  fetch("http://localhost:3000/api/products")
    .then( res => {
       // if (res.ok) {
            return res.json();
       // }
    })
    .then( value => {
        tableObjetApi = value;
        console.log(tableObjetApi)


        // gestion du panier////////////////////////
        async function affichagePanier() {

        if (panier) {   
            await panier; //tableau de données

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
               // prixTable.push(displaySousTotal.innerText); avant


                ///////////////////////////////////////

                //calcul sous total
                function  sousTotalPrice(){
                    for(let j = 0; j < tableObjetApi.length; j++){
                       
                         if(panier[i]._id == tableObjetApi[j]._id ){
                             
                             displaySousTotal.innerText = tableObjetApi[j].price + "€" ;
                            // displaySousTotal.innerText = tableObjetApi[j].price * `${panier[i].quantity}`+ "€" avant
                            
                         }
                        
                     }
                }
                sousTotalPrice();
                
                ///////////////////////////////////////   

                 ///affichage du prix total
                /////////////////////////////////////
                
                function affichePrixTotal(){
                    let  sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
            
                    let inputTable = document.getElementsByClassName("itemQuantity")
                   // let inputTable = document.getElementsByClassName("itemQuantity")
                   
                    //let totalFinal = 0
                    let totalFinal1 = 0
                    let totalFinalFinal = 0
                    let tableauPrixSousTotal = []
                    let tableauDesInput = []
                    //for(let q =0; q < inputTable.length; q++){
                    for(let l =0; l < panier.length; l++){
                        
                        for(let j = 0; j < sousTotalPrix.length; j++) {
                            
                            if(sousTotalPrix[j].dataset.id == panier[l]._id && 
                                sousTotalPrix[j].dataset.color == panier[l].couleur){
                                    console.log(panier[l].quantity + " "+ "valeur quantity")
                                    let sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                                    console.log(sousTotalPrixChaineCaractère + " " + "prix")//////////////////
                                    console.log(sousTotalPrixChaineCaractère * parseInt(panier[l].quantity) + " " + "sous totalt")//////////////////
                                    tableauPrixSousTotal.push(sousTotalPrixChaineCaractère * parseInt(panier[l].quantity))
                                    console.log(tableauPrixSousTotal )////////////////
                                    totalFinalFinal += sousTotalPrixChaineCaractère * parseInt(panier[l].quantity);
                                    console.log(totalFinalFinal + " " + "tota final final" )
                                    

                                    let grandTotal = document.querySelector("#totalPrice");
                                    grandTotal.innerText = totalFinalFinal;
                                
                            };
                        }
                        
                    }
                
                    
                }
                affichePrixTotal()
                

                /////////////////////////////////////
                
                /*
                ///affichage du prix total
                /////////////////////////////////////
            
                function affichePrixTotal(){
                    let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
               
                    let inputTable = document.getElementsByClassName("itemQuantity")
                    //let totalFinal = 0
                    let totalFinal1 = 0
                    let totalFinalFinal = 0
                    let tableauPrixSousTotal = []
                    let tableauDesInput = []
                    for(let j = 0; j < sousTotalPrix.length; j++) {
                    
                        for(let q=0; q < inputTable.length; q++){

                            /////////////////////////

                            let sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                           // console.log(sousTotalPrixChaineCaractère + " " + "prix")//////////////////
                            tableauPrixSousTotal.push(sousTotalPrixChaineCaractère)
                           // console.log(tableauPrixSousTotal )////////////////
                            /////////////////////////

                            //console.log(inputTable[q].value + " " + "val input")
                           
                                    totalFinal1 = inputTable[q].value * sousTotalPrixChaineCaractère
                                     totalFinalFinal += totalFinal1;
                                     //console.log(totalFinal1 + " " + "totalfinal1")
                                     
                            
                           
                            parseInt(inputTable[q].value);
                            
                            tableauDesInput.push(parseInt(inputTable[q].value))
                        }
                       // console.log(totalFinalFinal + " " + "prix total total")
                    }
                   
                    let grandTotal = document.querySelector("#totalPrice");
                    grandTotal.innerText = totalFinalFinal;
                   // console.log(totalFinalFinal + " " + "totalFinalfinal")
                }
                 
               /////////////////////////////////////
               affichePrixTotal()*/

                    
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
                input.max = "100";
                input.dataset.id = panier[i]._id
                input.dataset.color = panier[i].couleur

                
                input.addEventListener("input", function(even){

                    valInput = even.target.value;
                    newQuantity = parseInt(valInput)

                    if(valInput >= 0 && valInput < 100) {
                        
                        panier[i].quantity = newQuantity
                        //displaySousTotal.innerText = panier[i].price * valInput + "€" 
                  

                        localStorage.setItem("produit", JSON.stringify(panier)); 
                        

                        ///////////////////////////////////////
                            // total du panier
                       // let sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
                        
                        
                     /*   let totalFinal = 0
                        let tableauPrixSousTotal = []
                        for(let j = 0; j < sousTotalPrix.length; j++) {
                            const sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                            
                            tableauPrixSousTotal.push(sousTotalPrixChaineCaractère)
                            totalFinal += tableauPrixSousTotal[j] * valInput
                            console.log(totalFinal + " " + "totalfinal")
                           // console.log(tableauPrixSousTotal[j] + " " + "tableauprixtotal")
                            console.log(valInput + " " + "valinput")

                            for (let y = 0; y < tableauPrixSousTotal.length; y++) {
                                totalFinal += tableauPrixSousTotal[y]
                            
                                // total du panier
                                let grandTotal = document.querySelector("#totalPrice");

                                grandTotal.innerText = `${totalFinal}`
                                
                            }

                        } avant*/
                        
                        /////////////////////////////////////
                         ///affichage du prix total
                        /////////////////////////////////////
                        
                        function affichePrixTotal(){
                            let  sousTotalPrix = document.querySelectorAll(".sousTotalPrix");
                    
                            let inputTable = document.getElementsByClassName("itemQuantity")
                            //let totalFinal = 0
                            let totalFinal1 = 0
                            let totalFinalFinal = 0
                            let tableauPrixSousTotal = []
                            let tableauDesInput = []
                            for(let q =0; q < inputTable.length; q++){
                               
                               
                                for(let j = 0; j < sousTotalPrix.length; j++) {
                                    
                                    if(sousTotalPrix[j].dataset.id == inputTable[q].dataset.id && 
                                        sousTotalPrix[j].dataset.color == inputTable[q].dataset.color){
                                            console.log(inputTable[q].value + " "+ "present")
                                            let sousTotalPrixChaineCaractère = parseInt(sousTotalPrix[j].innerText.replace("€", ""))
                                            console.log(sousTotalPrixChaineCaractère + " " + "prix")//////////////////
                                            console.log(sousTotalPrixChaineCaractère * parseInt(inputTable[q].value) + " " + "sous totalt")//////////////////
                                            tableauPrixSousTotal.push(sousTotalPrixChaineCaractère * parseInt(inputTable[q].value))
                                            console.log(tableauPrixSousTotal )////////////////
                                            totalFinalFinal += sousTotalPrixChaineCaractère * parseInt(inputTable[q].value);
                                            console.log(totalFinalFinal + " " + "tota final final" )
                                            

                                            let grandTotal = document.querySelector("#totalPrice");
                                            grandTotal.innerText = totalFinalFinal;
                                            
                                        
                                    };
                                }
                               
                            }
                        
                            
                        }
                        /////////////////////////////////////
                        affichePrixTotal()
                        
                     
                        totalQuantity();
                        
                     ///////////////////////////////////////

                        //displayTotalPrixFinal() avant
                    }
                    else {
                        alert("la quantité doit être comprise entre 1 et 100")
                    }  
                    
                })
                ////////////////////////////////////////fin evenement
               

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
                                    hiddenBasket();
                                    totalQuantity();
                                   affichePrixTotal();
                                   masqueFormulaire();
                                        
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
                    //sousTotalPrice();

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
                /*function masqueFormulaire() {
                    
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
                }*/
              // masqueFormulaire(); 

              ///////////////////////////////
                //masque formulaire
                function masqueFormulaire() {
                    let grandTotal = document.querySelector("#totalPrice");
                    console.log(grandTotal.innerText + " " + " to")
                    if(grandTotal.innerText == 0){
                        const blockFormulaire = document.querySelector(".cart__order");
                        console.log(blockFormulaire)
                        blockFormulaire.style.display = "none";
                        localStorage.clear()
                    }
                }
                masqueFormulaire()
              //////////////////////////////
                
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
 formulaire.firstName.addEventListener("change",function() {
    validadFirsname(this);
 })


const validadFirsname = function(inputPrenom){
    //creation de la regexp
    let firstNameRegex = new RegExp("^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$");

    let testPrenom = firstNameRegex.test(inputPrenom.value);
    let alert = inputPrenom.nextElementSibling;
    
    if(testPrenom) {
        alert.innerHTML = "Prénom valid";
         alert.removeAttribute('id');
         alert.setAttribute("id", "champsOk")
        //alert.classList.add("champsOk")
        
       return true
    }
    else{
       
        alert.innerHTML = "votre prénom ne peut contenir de caractères spéciaux ni de chiffres";
        alert.removeAttribute('id');
        alert.setAttribute("id", "firstNameErrorMsg")
        
    }
    
}


 ///////////////validation du nom //////////////////
 formulaire.lastName.addEventListener("change",function() {
    validadLastname(this);
 })

 
const  validadLastname = function(inputNom){
    //creation de la regexp
    let lastNameRegex = new RegExp("^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$");

    let testNom = lastNameRegex.test(inputNom.value);
    let alert = inputNom.nextElementSibling;
    if(testNom) {
        alert.innerHTML = "Nom valid";
        alert.removeAttribute('id');
        alert.setAttribute("id", "champsOk")
        return true
        
    }
    else{
       
        alert.innerHTML = "votre nom ne peut contenir de caractères spéciaux ni de chiffres";
        alert.removeAttribute('id');
        alert.setAttribute("id", "lastNameErrorMsg")
        inputNom = null
    }
   
}


 ///////////////validation de l'adresse //////////////////
 formulaire.address.addEventListener("change",function() {
    validAdresse(this);
 })

 
const  validAdresse = function(inputAdresse){
    //creation de la regexp
    let adresseRegex = new RegExp(/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/);

    let tesAdresse = adresseRegex.test(inputAdresse.value);
    let alert = inputAdresse.nextElementSibling;
    
    if(tesAdresse) {
        alert.innerHTML = "Adresse valide";
        alert.removeAttribute('id');
        alert.setAttribute("id", "champsOk")
        return true
        
    }
    else{
       
        alert.innerHTML = "votre adresse ne peut contenir de caractères spéciaux sauf . , - et doit contenir des chiffres";
        alert.removeAttribute('id');
        alert.setAttribute("id", "addressErrorMsg")
        inputAdresse = null
    }
   
}


 ///////////////validation de la ville //////////////////
 formulaire.city.addEventListener("change",function() {
    validcity(this);
 })

 
const  validcity = function(inputVille){
    //creation de la regexp
    let villeRegex = new RegExp("^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$");

    let testville = villeRegex.test(inputVille.value);
    let alert = inputVille.nextElementSibling;
    
    if(testville) {
        alert.innerHTML = "Ville valide";
        alert.removeAttribute('id');
        alert.setAttribute("id", "champsOk")
        return true
        
    }
    else{
       
        alert.innerHTML = "votre ville ne peut contenir de chiffres ni de caractères spéciaux";
        alert.removeAttribute('id');
        alert.setAttribute("id", "cityErrorMsg")
        inputVille = null
    }
   
}

 ///////////////validation de l'email //////////////////

 formulaire.email.addEventListener("change",function() {
    validemail(this);
 })

 
const  validemail = function(inputEmail){
    //creation de la regexp
    let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    let testemail = emailRegex.test(inputEmail.value);
    let alert = inputEmail.nextElementSibling;
    
    if(testemail) {
        alert.innerHTML = "Adresse mail valide";
        alert.removeAttribute('id');
        alert.setAttribute("id", "champsOk")
       
        return true
    }
    else{
       
        alert.innerHTML = "adresse mail invalide ";
        alert.removeAttribute('id');
        alert.setAttribute("id", "emailErrorMsg")
        inputEmail = null
    }
   
};


 ///////////////////////////envoie formulaire///////////////////////
 formulaire.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("post stoppé")

    if( validemail(formulaire.email) && validcity(formulaire.city) && validAdresse(formulaire.address)
        && validadLastname(formulaire.lastName) && validadFirsname(formulaire.firstName)){  
    
        
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
        ///////////////////////////
        //recupération des valeurs du formulaire
        const prenom = document.getElementById("firstName");
        const nom = document.getElementById("lastName");
        const address= document.getElementById("address");
        const ville = document.getElementById("city");
        const mail= document.getElementById("email");
        
        
        ////////////////////////////
       
        const contact = {
            'firstName' : prenom.value,
            'lastName' : nom.value,
            'address' : address.value,
            'city' : ville.value,
            'email' : mail.value
        }
        console.log(products)
        
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
        alert("Erreur dans le formulaire tous les champs doivent correctement être renseignés")
        
    }


    })


})



