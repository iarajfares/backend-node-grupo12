const Swal = window.Swal;
const api_url = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', function () {
    const editarModal = document.getElementById('editarModal');
    const juegoForm = document.getElementById('juegoForm');
    const editarJuegoForm = document.getElementById('editarJuegoForm');
    const listaJuegos = document.querySelector('#listaJuegos tbody');
    const guardarCambios = document.getElementById('guardarCambiosBtn');
    // Formulario para crear juego nuevo
    if (juegoForm) {
        juegoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = document.getElementById('precio').value;
            const fecha_lanzamiento = document.getElementById('fechaLanzamiento').value;

            if (!nombre || !precio || !fecha_lanzamiento) {
                Swal.fire('Error', 'Por favor completa todos los campos obligatorios', 'error');
                return;
            }

            const juego = { nombre, descripcion, precio, fecha_lanzamiento };

            try {
                await crearJuego(juego);
                juegoForm.reset();
                fetchJuegos();
            } catch (error) {
                console.error('Error al crear juego:', error);
                Swal.fire('Error', 'Hubo un problema al crear el juego', 'error');
            }
        });
    } else {
        console.error('Elemento juegoForm no encontrado.');
    }

    // Función para cargar la lista de juegos
    const fetchJuegos = async () => {
        try {
            const response = await fetch(`${api_url}/api/juegos`);
            if (!response.ok) {
                throw new Error('La respuesta de red no fue satisfactoria');
            }
            const juegos = await response.json();
            renderGames(juegos.body);
        } catch (error) {
            console.error('Error al obtener juegos:', error);
            Swal.fire('Error', 'Hubo un problema al obtener la lista de juegos', 'error');
        }
    };

    // Renderizar juegos en la tabla
    const renderGames = (juegos) => {
        listaJuegos.innerHTML = '';
        juegos.forEach(juego => {
            const row = document.createElement('tr');
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
            let mes = String(fechaLanzamiento.getMonth() + 1).padStart(2, '0');
            let año = fechaLanzamiento.getFullYear();
            let fecha = `${dia} / ${mes} / ${año}`;
            fechaCelda.textContent = fecha;
            row.appendChild(fechaCelda);

            const accionesCelda = document.createElement('td');
            const botonEditar = document.createElement('button');
            const botonEliminar = document.createElement('button');

            botonEditar.classList.add('btn-editar');
            botonEliminar.classList.add('btn-eliminar');

            botonEditar.innerHTML = '<i class="fas fa-edit fa-icon"></i>';
            botonEditar.addEventListener('click', () => cargarDatosEdicion(juego));

            botonEliminar.innerHTML = '<i class="fas fa-trash-alt fa-icon"></i>';
            botonEliminar.addEventListener('click', () => confirmarEliminarJuego(juego.id));

            accionesCelda.appendChild(botonEditar);
            accionesCelda.appendChild(botonEliminar);

            row.appendChild(accionesCelda);
            listaJuegos.appendChild(row);
        });
    };

    // Eliminar juego con confirmación
    const confirmarEliminarJuego = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${api_url}/api/juegos/${id}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    if (response.ok) {
                        Swal.fire(
                            '¡Eliminado!',
                            'El juego ha sido eliminado correctamente',
                            'success'
                        );
                        fetchJuegos();
                    } else {
                        const errorData = await response.json();
                        Swal.fire(
                            'Error',
                            `No se pudo eliminar el juego: ${errorData.error}`,
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Error al eliminar juego:', error);
                    Swal.fire('Error', 'Hubo un problema al eliminar el juego', 'error');
                }
            }
        });
    };

    // Crear un nuevo juego
    const crearJuego = async (juego) => {
        try {
            const response = await fetch(`${api_url}/api/juegos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(juego)
            });
            if (!response.ok) {
                throw new Error('Error al crear juego');
            }
            fetchJuegos();
        } catch (error) {
            console.error('Error al crear juego:', error);
            throw error;
        }
    };

    // Cargar datos del juego en el formulario de edición
    const cargarDatosEdicion = (juego) => {
        document.getElementById('editJuegoId').value = juego.id;
        document.getElementById('editNombre').value = juego.nombre;
        document.getElementById('editDescripcion').value = juego.descripcion;
        document.getElementById('editPrecio').value = juego.precio;
        document.getElementById('editFechaLanzamiento').value = juego.fecha_lanzamiento;

        $('#editarModal').modal('show');
    };

    // Editar juego existente
    guardarCambios.addEventListener('submit', async (e) => {
        console.log('hola');
        e.preventDefault();

        const id = document.getElementById('editJuegoId').value;
        const nombre = document.getElementById('editNombre').value;
        const descripcion = document.getElementById('editDescripcion').value;
        const precio = document.getElementById('editPrecio').value;
        const fecha_lanzamiento = document.getElementById('editFechaLanzamiento').value;

        if (!nombre || !precio || !fecha_lanzamiento) {
            Swal.fire('Error', 'Por favor completa todos los campos obligatorios', 'error');
            return;
        }

        const juego = { id, nombre, descripcion, precio, fecha_lanzamiento };

        try {
            await editarJuego(id, juego);
            $('#editarModal').modal('hide');
            fetchJuegos();
        } catch (error) {
            console.error('Error al editar juego:', error);
            Swal.fire('Error', 'Hubo un problema al guardar los cambios del juego', 'error');
        }
    });

    // Editar juego existente en la base de datos
    const editarJuego = async (id, juego) => {
        try {
            const response = await fetch(`${api_url}/api/juegos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(juego)
            });
            if (!response.ok) {
                throw new Error('Error al editar juego');
            }
        } catch (error) {
            console.error('Error al editar juego:', error);
            throw error;
        }
    };

    // Cargar la lista de juegos al cargar la página
    fetchJuegos();
});
