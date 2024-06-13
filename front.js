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
                console.log(element)
                let contenitoreProdotti = document.getElementById('contenitoreProdotti')
                contenitoreProdotti.innerHTML += 
                `
                <div class="card col-6">
                    <img src="${element.imageUrl}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${element.brand}</h5>
                        <p class="card-text">${element.name}</p>
                        <p class="card-text">${element.description}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                `
                
            });
        })
    })
}