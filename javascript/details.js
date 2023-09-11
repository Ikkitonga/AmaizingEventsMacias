const queryString = location.search;
const params = new URLSearchParams(queryString);

const _id = params.get("id"); 

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    eventos = data.events;
    const persona = eventos.find(evento => evento._id == _id); 
    if (persona) {
      pintarDetails(persona); 
    } else {
      alert("Evento no encontrado");
    }
  })
  .catch(error => console.log(error));

function pintarDetails(evento) {
  const main = document.querySelector(".main-details");

  main.innerHTML += `<div class="tarjetadetails">
    <div class="detailsimg">
      <img class="imagen-details" src="${evento.image}" alt="${evento.name}">
    </div>
    <div class="info-details">
      <h3 class="titulo-tarjetadetails">${evento.name}</h3>
      <p class="parrafo-details date"><b>Fecha:</b> ${evento.date}</p>
      <p class="parrafo-details descripcion"><b>Descripcion:</b> ${evento.description}</p>
      <p class="parrafo-details place"><b>Lugar:</b> ${evento.place}</p>
      <p class="parrafo-details precio"><b>Precio: $</b>${evento.price}</p>
    </div>
  </div>`;
}
