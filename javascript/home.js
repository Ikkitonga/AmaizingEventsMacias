let contenido = document.querySelector("#contenido");

function crearMostrarTarjetas(arregloPersonas, dondePintar) {
    let tarjetas = "";

    for (persona of arregloPersonas) {
        tarjetas += `
        <div class="contenedortarjeta">
        <div>
            <img class="imgtarjeta" src="${persona.image}" alt="">
        </div>
            <div class="titulotarjeta">
                <h3>${persona.name}</h3>
                <p>${persona.description}</p>
            </div>
            <div class="price-details">
                    <div>
                        <p>$${persona.price}</p>
                    </div>
                <div>
                    <a href="./details.html" class="details">Details</a>
                </div>
            </div>
        </div>`;
    }

    dondePintar.innerHTML = tarjetas;
}

crearMostrarTarjetas(data.events, contenido);


