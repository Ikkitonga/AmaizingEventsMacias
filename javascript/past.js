const checkboxContainer = document.getElementById("checks");
let contenidoCards = document.getElementById('contenido');
let eventos = [];

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    eventos = data.events;

    
    mostrarEventosPasados(eventos);
    generarCheckboxes();

    
  })
  .catch(error => console.log(error));

const currentDate = new Date('2023-03-10');

function mostrarEventosPasados(eventos) {
  contenidoCards.innerHTML = "";

  if (eventos.length === 0) {
    contenidoCards.innerHTML = "<p>Lo sentimos, no se encontraron eventos que coincidan con los filtros.</p>";
  } else {
    eventos.forEach((evento) => {
      const eventDate = new Date(evento.date);

      if (eventDate < currentDate) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = `
          <div class="contenedortarjeta">
            <img src="${evento.image}" alt="${evento.name}" class="imgtarjeta">
            <div class="titulotarjeta">
              <h3>${evento.name}</h3>
              <p>${evento.description}</p>
            </div>    
            <div class="price-details">
              <div>    
                <p>Precio: $${evento.price}</p>
              </div>
              <div>
                <a href="./details.html?id=${evento._id}" class="details">Details</a>
              </div>
            </div> 
          </div>  
        `;
        contenidoCards.appendChild(tarjeta);
      }
      console.log(currentDate)
    });
  }
}

// Función para generar los checkboxes dinámicamente
function generarCheckboxes() {
  const categoriasUnicas = [...new Set(eventos.map((evento) => evento.category))];

  categoriasUnicas.forEach((categoria, index) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "check";
    checkbox.id = "category" + index;
    checkbox.value = categoria;
    checkbox.addEventListener("change", filtrarEventos);

    const label = document.createElement("label");
    label.htmlFor = "category" + index;
    label.textContent = categoria;

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
  });
}

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

// Funcion para filtrar los eventos
function filtrarEventos() {
  const filtroCategoria = Array.from(checkboxContainer.querySelectorAll(".check"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => normalizarTexto(checkbox.value));
  const filtroTexto = normalizarTexto(document.getElementById("texto").value);

  const eventosFiltrados = eventos.filter((evento) => {
    const categoriaEvento = normalizarTexto(evento.category);
    const nombreEvento = normalizarTexto(evento.name);
    const fechaEvento = new Date(evento.date);

    const cumpleFiltroCategoria =
      filtroCategoria.length === 0 || filtroCategoria.includes(categoriaEvento);
    const cumpleFiltroTexto = filtroTexto === "" || nombreEvento.includes(filtroTexto);
    const eventoYaPaso = fechaEvento < currentDate;

    return cumpleFiltroCategoria && cumpleFiltroTexto && eventoYaPaso;
  });

  mostrarEventosPasados(eventosFiltrados);
}

// Manejador de eventos 
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded se ha ejecutado.");
});

document.getElementById("texto").addEventListener("input", filtrarEventos);