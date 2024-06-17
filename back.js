
let scatolaProdotti = document.getElementById('prodottiAggiunti')

// DEFINISCO LA FUNZIONE PER PRENDERE I VALORI INSERITI NEGLI INPUT E TRAMITE IL METODO POST VADO AD AGGIUNGERLI ALL'ENDPOINT 
function aggiungiProdotto() {
    
    let getName = document.getElementById('name').value
    let getDescription = document.getElementById('description').value
    let getBrand = document.getElementById('brand').value
    let getImageUrl = document.getElementById('imageUrl').value
    let getPrice = document.getElementById('price').value

    if(getName !== "" && getDescription !== "" && getBrand !== "" && getImageUrl !== "" && getPrice !== "") {

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODZmMDhmYzBmMzAwMTU1ZTViNTMiLCJpYXQiOjE3MTgxMjYzMjAsImV4cCI6MTcxOTMzNTkyMH0.J2W69t_XKlqvVMAL8wxYWKtf8_CURJRCvOf0OKWqOD4",
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            name: getName,
            description: getDescription,
            brand: getBrand,
            imageUrl: getImageUrl,
            price: getPrice,
        })
    })
        .then(response => {
            if (response.status === 200) {
                renderModal("Carimento effettuato", "Prodotto caricato correttamente")
                renderElementi ()
                pulisciModal()
                
            } else {
                renderModal("Attenzione !", "Articolo già in magazzino")
            }
        })
    } else {
        renderModal("Attenzione !", "Non hai completato tutti i campi")
    }
}

// DEFINISCO UNA FUNZIONE PER PULIRE I CAMPI INPUT UNA VOLTA INSERITE IL PRODOTTO

function pulisciModal() {
    document.getElementById('name').value = ''
    document.getElementById('description').value = ''
    document.getElementById('brand').value = ''
    document.getElementById('imageUrl').value = ''
    document.getElementById('price').value = ''
}

// AL CARICAMENTO DELLA PAGINA RICHIAMO LA FUNZIONE CHE MI RENDERIZZA I DATI PRECEDENTEMENTE INSERITI TRAMITE LA POST 

document.addEventListener("DOMContentLoaded", () => {
    
    renderElementi ()
})

// DEFINISCO UNA FUNZIONE PER RENDERIZZARE GLI ELEMENTI TRAMITE UNA GET

function renderElementi () {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODZmMDhmYzBmMzAwMTU1ZTViNTMiLCJpYXQiOjE3MTgxMjYzMjAsImV4cCI6MTcxOTMzNTkyMH0.J2W69t_XKlqvVMAL8wxYWKtf8_CURJRCvOf0OKWqOD4",
            "content-type": "application/json"
        },
    })
        .then(response => {
            response.json()
                .then(data => {
                    scatolaProdotti.innerHTML = ''
                    let counter = 1; 
                    data.forEach(element => {
                        //console.log(element)
                        
                        scatolaProdotti.innerHTML +=

                            `

                            <tr>
                            <th scope="row">${counter}</th>
                            <td>${element._id}</td>
                            <td>${element.brand}</td>
                            <td>${element.name}</td>
                            <td>${element.description}</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" onclick="modifica('${element._id}')" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                            </td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" onclick="rimuovi('${element._id}')" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </td>
                            

                            
                            `
                            counter ++
                        //console.log(scatolaProdotti)
                    });
                })
        })
}



function modifica(id) {
    console.log("sto provando a modificare" + id)
    let overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none')
    let editModal = document.getElementById('edit-modal')
    editModal.classList.add('d-block')
    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODZmMDhmYzBmMzAwMTU1ZTViNTMiLCJpYXQiOjE3MTgxMjYzMjAsImV4cCI6MTcxOTMzNTkyMH0.J2W69t_XKlqvVMAL8wxYWKtf8_CURJRCvOf0OKWqOD4",
            "content-type": "application/json"
        },
    })
        .then(response => {
            response.json()
                .then(data => {
                    document.getElementById('name_modifica').value = data.name
                    document.getElementById('description_modifica').value = data.description
                    document.getElementById('brand_modifica').value = data.brand
                    document.getElementById('imageUrl_modifica').value = data.imageUrl
                    document.getElementById('price_modifica').value = data.price

                    document.getElementById('id_mod').value = data._id
                })
        })
}

// DEFINISCO UNA FUNZIONE PER MODIFICARE I VALORI DI UN PRODOTTO PRECEDENTEMENTE INSERITO TRAMITE IL METODO PUT

function modificaProdotto() {
                let nomeModificato =    document.getElementById('name_modifica').value 
                let descriptionModificato =    document.getElementById('description_modifica').value 
                let brandModificato =    document.getElementById('brand_modifica').value 
                let imageModificato =    document.getElementById('imageUrl_modifica').value 
                let priceModificato =    document.getElementById('price_modifica').value 
                let idModificato =    document.getElementById('id_mod').value 

                fetch("https://striveschool-api.herokuapp.com/api/product/" + idModificato, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODZmMDhmYzBmMzAwMTU1ZTViNTMiLCJpYXQiOjE3MTgxMjYzMjAsImV4cCI6MTcxOTMzNTkyMH0.J2W69t_XKlqvVMAL8wxYWKtf8_CURJRCvOf0OKWqOD4",
            "content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            name: nomeModificato,
            description: descriptionModificato,
            brand: brandModificato,
            imageUrl: imageModificato,
            price: priceModificato,
        })
    })
    .then(response => {
        if (response.status === 200) {
            renderModal("Complimenti", "prodotto caricato correttamente")
            chiudiModal()
            renderElementi()
        } else {
            renderModal("Articolo già in magazzino")
        }
    })
}

// DEFINISCO UNA FUNZIONE PER APRIRE UN MODALE CHE CHIEDA CONFERMA ALL'UTENTE SE È SICURO DI VOLER ELIMINARE IL PRODOTTO

function rimuovi(id) {
    console.log("sto provando a rimuovere" + id)
    let modalFooter = document.getElementById('modal-footer')
    modalFooter.innerHTML = ''
    modalFooter.innerHTML +=
    `
    <button type="button" class="btn btn-primary" onclick="(confermaEliminazione('${id}'))">DELETE</button>
    `

    let getModal = document.getElementById('modal')
    getModal.classList.add('d-block')

    let overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none')

}

// DEFINISCO UNA FUNZIONE PER CHIUDERE I MODALI

function chiudiModal() {
    let modal = document.getElementById('modal')
    modal.classList.remove('d-block')

    let overlay = document.getElementById('overlay')
    overlay.classList.add('d-none')

    let editModal = document.getElementById('edit-modal')
    editModal.classList.remove('d-block')

    let modalId = document.getElementById('modalId')
    modalId.classList.remove('d-block')
}

// DEFINISCO UNA FUNZIONE ELIMINA IL PRODOTTO TRAMITE IL METODO DELETE

function confermaEliminazione(id) {
    console.log("confermo eliminazione" + id)
    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODZmMDhmYzBmMzAwMTU1ZTViNTMiLCJpYXQiOjE3MTgxMjYzMjAsImV4cCI6MTcxOTMzNTkyMH0.J2W69t_XKlqvVMAL8wxYWKtf8_CURJRCvOf0OKWqOD4",
            "content-type": "application/json"
        }
        
    })
    .then(response => {
        if (response.status === 200) {
            chiudiModal()
            scatolaProdotti.innerHTML = ''
            renderElementi ()
        } else {
            alert('Errore, riprova tra un minuto')
        }
    })
    
}

// DEFINISCO UNA FUNZIONE CHE MI PERMETTE DI GESTIRE I MODALI CON DIVERSE DESCRIZIONI E FUNZIONALITÀ A SECONDA DELLA NECESSITÀ

function renderModal (title, message, ok, cancel) {
    let modalDiv = document.getElementById('modalId')
    modalDiv.classList.add('d-block')

    document.getElementById('modal-title').innerHTML = title
    document.getElementById('modal-body').innerHTML = message
    

    // <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //           <button type="button" class="btn btn-primary">Save changes</button>
}

