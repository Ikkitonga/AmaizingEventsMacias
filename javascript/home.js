const checkboxContainer = document.getElementById("checks");
let contenidoCards = document.getElementById('contenido');
let eventos = [];

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    eventos = data.events;
    crearMostrarTarjetas(eventos, contenidoCards);
    generarCheckboxes();
  })
  .catch(error => console.log(error));

function crearMostrarTarjetas(arregloEventos, dondePintar) {
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

function filtrarEventos() {
  const filtroCategoria = Array.from(checkboxContainer.querySelectorAll(".check"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => normalizarTexto(checkbox.value));
  const filtroTexto = normalizarTexto(document.getElementById("texto").value);

  const eventosFiltrados = eventos.filter((evento) => {
    const categoriaEvento = normalizarTexto(evento.category);
    const nombreEvento = normalizarTexto(evento.name);

    const cumpleFiltroCategoria =
      filtroCategoria.length === 0 || filtroCategoria.includes(categoriaEvento);
    const cumpleFiltroTexto = filtroTexto === "" || nombreEvento.includes(filtroTexto);

    return cumpleFiltroCategoria && cumpleFiltroTexto;
  });

  mostrarEventos(eventosFiltrados);
}

function mostrarEventos(eventos) {
  contenidoCards.innerHTML = "";

  if (eventos.length === 0) {
    contenidoCards.innerHTML = "<p>Lo sentimos, no se encontraron eventos que coincidan con los filtros.</p>";
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
      contenidoCards.appendChild(tarjeta);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded se ha ejecutado.");
});

document.getElementById("texto").addEventListener("input", filtrarEventos);
