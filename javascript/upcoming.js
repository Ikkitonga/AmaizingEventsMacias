
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
          <a href="./details.html?id=${evento._id}" class="details">Details</a>
        </div>
      </div>
    </div>`;
  }

  dondePintar.innerHTML = tarjetas;
}

mostrarEventosFuturos(eventosFuturos, contenido);


// Obtenemos el contenedor de los checkboxes y el contenedor de tarjetas
const checkboxContainer = document.getElementById("checks");
const contenidoCards = document.getElementById("contenido");

// Función para generar los checkboxes dinámicamente
function generarCheckboxes() {
  // Obtenemos todas las categorías únicas de los eventos
  const categoriasUnicas = [...new Set(data.events.map((evento) => evento.category))];

  // Generamos un checkbox por cada categoría única
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

// Función para normalizar un texto (quitar espacios y hacerlo minúsculas)
function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

// Función para filtrar los eventos
function filtrarEventos() {
  const categoriaCheckboxes = document.querySelectorAll(".check");
  const filtroCategoria = Array.from(categoriaCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => normalizarTexto(checkbox.value));
  const filtroTexto = normalizarTexto(document.getElementById("texto").value);

  const eventosFiltrados = data.events.filter((evento) => {
    const categoriaEvento = normalizarTexto(evento.category);
    const nombreEvento = normalizarTexto(evento.name);
    const fechaEvento = new Date(evento.date);

    const cumpleFiltroCategoria =
      filtroCategoria.length === 0 || filtroCategoria.includes(categoriaEvento);
    const cumpleFiltroTexto = filtroTexto === "" || nombreEvento.includes(filtroTexto);
    const eventoNoHaPasado = fechaEvento > currentDate;

    return cumpleFiltroCategoria && cumpleFiltroTexto && eventoNoHaPasado;
  });

  mostrarEventos(eventosFiltrados);
}

// Función para mostrar los eventos
function mostrarEventos(eventos) {
  contenidoCards.innerHTML = "";

  if (eventos.length === 0) {
    contenidoCards.innerHTML = "<p>Lo sentimos no se encontraron eventos que coincidan con los filtros.</p>";
  } else {
    eventos.forEach((evento) => {
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
      contenido.appendChild(tarjeta);
    });
  }
}

// Manejadores de eventos
document.addEventListener("DOMContentLoaded", () => {
  generarCheckboxes();
  filtrarEventos(); 
});

document.getElementById("texto").addEventListener("input", filtrarEventos);