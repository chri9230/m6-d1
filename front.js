let totaleCarrello = 0 

document.addEventListener("DOMContentLoaded", async () => {
    displayProducts()
})

function displayProducts() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODZmMDhmYzBmMzAwMTU1ZTViNTMiLCJpYXQiOjE3MTgxMjYzMjAsImV4cCI6MTcxOTMzNTkyMH0.J2W69t_XKlqvVMAL8wxYWKtf8_CURJRCvOf0OKWqOD4",
        }
    })
    .then(response => {
        response.json()
        .then(data => {
            data.forEach(element => {
               
                let contenitoreProdotti = document.getElementById('contenitoreProdotti')
                contenitoreProdotti.innerHTML += 
                `
                <div class="card col-6">
                    <img src="${element.imageUrl}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${element.brand}</h5>
                        <p class="card-text">${element.name}</p>
                        <p class="card-text">${element.description}</p>
                        <p class="card-text"><u><i>${element.price} €</i></u></p>
                        <a href="#" class="btn btn-primary" onclick='addCart("${element.name}","${element.price}")'>Add Cart</a>
                    </div>
                </div>

                `
                
            });
        })
    })
}

function addCart(articolo, price) {
    let contenitoreLi = document.getElementById('listaCarrello');

    totaleCarrello += parseFloat(price);
    document.getElementById('totale').innerHTML = totaleCarrello.toFixed(2) + ' €';

    let li = document.createElement('li');
    li.id = 'art';
    li.innerHTML = `${articolo} - ${price} € 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16" onclick='elimina(event, ${price})'>
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
        </svg>`;
    contenitoreLi.appendChild(li);
}

function svuotaCarrello() {
    document.getElementById('listaCarrello').innerHTML = '';
    totaleCarrello = 0;
    document.getElementById('totale').innerHTML = totaleCarrello.toFixed(2) + ' €';
}

function elimina(event, price) {
    let liDaRimuovere = event.target.closest('li');
    liDaRimuovere.remove();
    totaleCarrello -= parseFloat(price);
    document.getElementById('totale').innerHTML = totaleCarrello.toFixed(2) + ' €';
}



