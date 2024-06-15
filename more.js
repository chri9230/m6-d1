document.addEventListener("DOMContentLoaded", () => {

    renderElementi()
})

function renderElementi() {

    const params = new URLSearchParams(location.search)
    // console.log(params)

    let id = params.get("_id")
    // console.log(id)


    fetch("https://striveschool-api.herokuapp.com/api/product/" + id , {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODZmMDhmYzBmMzAwMTU1ZTViNTMiLCJpYXQiOjE3MTgxMjYzMjAsImV4cCI6MTcxOTMzNTkyMH0.J2W69t_XKlqvVMAL8wxYWKtf8_CURJRCvOf0OKWqOD4",
            "content-type": "application/json"
        },
    })
        .then(response => {
            response.json()
                .then(data => {
                    // console.log(data)
                    let contenitore = document.getElementById('card')

                    // console.log(data.brand)

                    contenitore.innerHTML += 
                    `
                    <div class="row">
                        <div id="img" class="col-12 col-sm-6">
                            <img src="${data.imageUrl}" alt="">
                        </div>
                        <div id="dex" class="col-12 col-sm-6">
                            <h2>${data.brand}</h2>
                            <h3>${data.name}</h3>
                            <p>${data.description}</p>
                            <p>${data.price} €</p>
                        </div>
                    </div>
                
                    `
                })
        })
}