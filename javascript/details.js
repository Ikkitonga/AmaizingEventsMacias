const queryString = location.search;
const params = new URLSearchParams(queryString);

const _id = params.get("id"); 

const persona = data.events.find(evento => evento._id == _id); 

function pintarDetails(persona) {
  const main = document.querySelector(".main-details");

  main.innerHTML += `<div class="tarjetadetails">
    <div class="detailsimg">
      <img class="imagen-details" src="${persona.image}" alt="${persona.name}">
    </div>
    <div class="info-details">
      <h3 class="titulo-tarjetadetails">${persona.name}</h3>
      <p class="parrafo-details date"><b>Fecha:</b> ${persona.date}</p>
      <p class="parrafo-details descripcion"><b>Descripcion:</b> ${persona.description}</p>
      <p class="parrafo-details place"><b>Lugar:</b> ${persona.place}</p>
      <p class="parrafo-details precio"><b>Precio: $</b>${persona.price}</p>
    </div>
  </div>`;
}

if(persona){
    pintarDetails(persona);
} else {
    alert("Evento no encontrado");
}