const api_url = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', function() {
    const juegoForm = document.getElementById('juegoForm');
    const listaJuegos = document.querySelector('#listaJuegos tbody');

    function formatearFecha(juego) {
        let fechaLanzamiento = new Date(juego.fecha_lanzamiento);
        let dia = String(fechaLanzamiento.getDate()).padStart(2, '0');
        let mes = String(fechaLanzamiento.getMonth()+ 1).padStart(2, '0');
        let año = fechaLanzamiento.getFullYear();
        let fecha = `${dia} - ${mes} - ${año}`
    }

    // formulario para crear juego nuevo
    if (juegoForm) {
        juegoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = document.getElementById('precio').value;
            const fecha_lanzamiento = document.getElementById('fechaLanzamiento').value;
            await crearJuego({ nombre, descripcion, precio, fecha_lanzamiento });
            juegoForm.reset();
            fetchJuegos();
        });
    } else {
        console.error('Elemento juegoForm no encontrado.');
    }

    const fetchJuegos = async () => {
        const renderGames = (juegos) => {
            listaJuegos.innerHTML = '';
            juegos.forEach(juego => {
                const row = document.createElement('tr');
                // const idCelda = document.createElement('td');
                // idCelda.textContent = juego.id;
                // row.appendChild(idCelda);

                const nombreCelda = document.createElement('td');
                nombreCelda.textContent = juego.nombre;
                row.appendChild(nombreCelda);

                const descripcionCelda = document.createElement('td');
                descripcionCelda.textContent = juego.descripcion;
                row.appendChild(descripcionCelda);

                const precioCelda = document.createElement('td');
                precioCelda.textContent = juego.precio;
                row.appendChild(precioCelda);

                const fechaCelda = document.createElement('td');
                let fechaLanzamiento = new Date(juego.fecha_lanzamiento);
                let dia = String(fechaLanzamiento.getDate()).padStart(2, '0');
                let mes = String(fechaLanzamiento.getMonth()+ 1).padStart(2, '0');
                let año = fechaLanzamiento.getFullYear();
                let fecha = `${dia} / ${mes} / ${año}`
                fechaCelda.textContent = fecha;
                row.appendChild(fechaCelda);

                listaJuegos.appendChild(row);
            });
        };

        try { 
            const response = await fetch(`${api_url}/api/juegos`);
            if (!response.ok) {
                throw new Error('La respuesta de red incorrecta');
            }
            const juegos = await response.json();
            console.log('Juego:', juegos);
            renderGames(juegos.body);
        } catch (error) {
            console.error('Error al traer juegos', error)
        };
    };
    // formulario para crear juego nuevo

    // const crearJuego = async (juego) => {
    //     try {
    //         const response = await fetch(`${api_url}/api/juegos`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify(juego)
    //         });
    //     } catch {
    //         console.error('Error al crear juego:', error);
    //     }
    // };
    fetchJuegos();
});
