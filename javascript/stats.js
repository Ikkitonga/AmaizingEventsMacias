fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const currentDate = new Date(data.currentDate);
        const eventos = data.events.filter(evento => new Date(evento.date) < currentDate);

        // Events statics

        if (eventos.length > 0) {
            const maxAssistanceEvent = eventos.reduce((prev, current) => (current.assistance > prev.assistance) ? current : prev);
            const minAssistanceEvent = eventos.reduce((prev, current) => (current.assistance < prev.assistance) ? current : prev);
            const maxCapacityEvent = eventos.reduce((prev, current) => (current.capacity > prev.capacity) ? current : prev);

            const moreAssistance = document.getElementById('moreAssistance');
            const lowAssistance = document.getElementById('lowAssistance');
            const longCapacity = document.getElementById('longCapacity');

            moreAssistance.textContent = `Event with highest % of assistance: ${maxAssistanceEvent.name} (${(maxAssistanceEvent.assistance / maxAssistanceEvent.capacity * 100).toFixed(2)}%)`;
            lowAssistance.textContent = `Event with lowest % of assistance: ${minAssistanceEvent.name} (${(minAssistanceEvent.assistance / minAssistanceEvent.capacity * 100).toFixed(2)}%)`;
            longCapacity.textContent = `Event with longer capacity: ${maxCapacityEvent.name}`;
        } else {
            console.log("No events found before the current date.");
        }

        const selectCategory = document.getElementById('category');
        const selectCategoryPast = document.getElementById('categorypast');

        // upcoming events statistics by category

        const gananciaUp = document.getElementById('revenuesUp');
        const porcentajeDeAsistUp = document.getElementById('porcentOfAssistanceUp')

        const categorias = [...new Set(data.events.map(evento => evento.category))]; // Obtener categorías únicas

        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            selectCategory.appendChild(option);
        });

        const categoriaPast = [...new Set(data.events.map(evento => evento.category))];

        categoriaPast.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            selectCategoryPast.appendChild(option);
        })

        selectCategory.addEventListener('change', () => {
            const selectedCategory = selectCategory.value;
            console.log("Categoría seleccionada:", selectCategory.value);

            // Filtrar eventos por categoría seleccionada y fecha actual
            // Configura la fecha actual
            const currentDate = new Date('2023-03-10');

            // Filtra eventos que coinciden con la categoría seleccionada y son futuros

            const filteredEvents = data.events.filter((evento) => {
                const eventDate = new Date(evento.date);
                return evento.category === selectedCategory && eventDate > currentDate;
            });

            console.log("Eventos filtrados:", filteredEvents);
            console.log(currentDate)


            // Comprobar si hay eventos que coincidan con la categoría seleccionada y la fecha
            if (filteredEvents.length > 0) {
                // Calcular la ganancia para la categoría seleccionada
                const totalRevenue = filteredEvents.reduce((total, evento) => {
                    const estimate = parseFloat(evento.estimate);
                    const price = parseFloat(evento.price);

                    // Comprobar si estimate y price son números válidos
                    if (!isNaN(estimate) && !isNaN(price)) {
                        return total + (estimate * price);
                    } else {
                        console.error(`Evento con datos incorrectos: ${evento.name}`);
                        return total;
                    }
                }, 0);

                // Actualizar el contenido del <td> con el id "revenuesUp" con la ganancia calculada
                gananciaUp.textContent = `$${totalRevenue.toFixed(0)}`;
            } else {
                // No se encontraron eventos para la categoría seleccionada y la fecha
                gananciaUp.textContent = `No events found for ${selectedCategory}`;
            }

            // porcentaje de capacidad upComing
            if (filteredEvents.length > 0) {
                let totalAssistance = 0; // Inicializa totalAssistance

                filteredEvents.forEach((evento) => {
                    const estimate = parseFloat(evento.estimate);
                    const capacity = parseFloat(evento.capacity);

                    // Comprobar si estimate y capacity son números válidos
                    if (!isNaN(estimate) && !isNaN(capacity)) {
                        const percentAssistance = (estimate * 100) / capacity;
                        totalAssistance += percentAssistance;
                    } else {
                        console.error(`Evento con datos incorrectos: ${evento.name}`);
                    }
                });

                const averageAssistance = totalAssistance / filteredEvents.length; // Calcula el promedio

                // Actualiza el elemento HTML con el promedio de asistencia estimada
                porcentajeDeAsistUp.textContent = `${averageAssistance.toFixed(2)}%`;
            } else {
                // Si no hay eventos filtrados, muestra un mensaje de error o lo que desees
                porcentajeDeAsistUp.textContent = `No events found for ${selectedCategory}`;
            }

        });


        // Past events statistics by category


// Escuchar cambios en la selección de categoría pasada
selectCategoryPast.addEventListener('change', () => {
    // Obtener el valor seleccionado
    const categoryPast = selectCategoryPast.value;
    console.log("Categoría seleccionada:", categoryPast);

    const gananciaPast = document.getElementById('revenuesPast');
    const porcentajeDeAsistPast = document.getElementById('porcentOfAssistancePast');

    // Filtrar eventos pasados
    const filteredPastEvents = data.events.filter((evento) => {
        const eventDate = new Date(evento.date);
        return evento.category === categoryPast && eventDate < currentDate;
    });

    console.log("Eventos pasados filtrados:", filteredPastEvents);

    // Comprobar si hay eventos pasados que coincidan con la categoría seleccionada
    if (filteredPastEvents.length > 0) {
        // Calcular la ganancia para la categoría seleccionada de eventos pasados
        const totalPastRevenue = filteredPastEvents.reduce((total, evento) => {
            const assistance = parseFloat(evento.assistance);
            const price = parseFloat(evento.price);

            // Comprobar si assistance y price son números válidos
            if (!isNaN(assistance) && !isNaN(price)) {
                return total + (assistance * price);
            } else {
                console.error(`Evento con datos incorrectos: ${evento.name}`);
                return total;
            }
        }, 0);

        // Actualizar el contenido del <td> con el id "revenuesPast" con la ganancia calculada
        gananciaPast.textContent = `$${totalPastRevenue.toFixed(0)}`;
    } else {
        // No se encontraron eventos pasados para la categoría seleccionada
        gananciaPast.textContent = `No past events found for ${categoryPast}`;
    }

    // porcentaje de capacidad para eventos pasados
    if (filteredPastEvents.length > 0) {
        let totalPastAssistance = 0; // Inicializa totalPastAssistance

        filteredPastEvents.forEach((evento) => {
            const assistance = parseFloat(evento.assistance);
            const capacity = parseFloat(evento.capacity);

            // Comprobar si assistance y capacity son números válidos
            if (!isNaN(assistance) && !isNaN(capacity)) {
                const percentPastAssistance = (assistance * 100) / capacity;
                totalPastAssistance += percentPastAssistance;
            } else {
                console.error(`Evento con datos incorrectos: ${evento.name}`);
            }
        });

        const averagePastAssistance = totalPastAssistance / filteredPastEvents.length; // Calcula el promedio

        // Actualiza el elemento HTML con el promedio de asistencia estimada para eventos pasados
        porcentajeDeAsistPast.textContent = `${averagePastAssistance.toFixed(2)}%`;
    } else {
        // Si no hay eventos pasados filtrados, muestra un mensaje de error o lo que desees
        porcentajeDeAsistPast.textContent = `No past events found for ${categoryPast}`;
    }
});

// El código anterior asume que tienes elementos HTML con los IDs correctos ('categorypast', 'revenuesPast', 'porcentOfAssistancePast') en tu documento HTML.


    })
    .catch(error => console.log(error));


