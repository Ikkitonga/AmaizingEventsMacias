
let contenido = document.querySelector("#contenido");

const currentDate = new Date('2023-01-01');
const eventosFuturos = [];

for (evento of data.events) {
  const eventDate = new Date(evento.date);

  if (eventDate > currentDate) {
    eventosFuturos.push(evento);
  }
}

function mostrarEventosFuturos(arregloEventos, dondePintar) {
  let tarjetas = "";

  for (evento of arregloEventos) {
    tarjetas += `
    <div class="contenedortarjeta">
      <div>
        <img class="imgtarjeta" src="${evento.image}" alt="">
      </div>
      <div class="titulotarjeta">
        <h3>${evento.name}</h3>
        <p>${evento.description}</p>
      </div>
      <div class="price-details">
        <div>
          <p>$${evento.price}</p>
        </div>
        <div>
          <a href="./details.html" class="details">Details</a>
        </div>
      </div>
    </div>`;
  }

  dondePintar.innerHTML = tarjetas;
}

mostrarEventosFuturos(eventosFuturos, contenido);