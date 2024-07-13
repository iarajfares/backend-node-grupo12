const api = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const linkCrearUsuario = document.getElementById('linkCrearUsuario');
    const crearUsuario = document.getElementById('crearUsuario');
    const cerrar = document.querySelector('.cerrar');
    const crearUsuarioFormulario = document.getElementById('crearUsuarioFormulario');

    // abrir modal
    linkCrearUsuario.addEventListener('click', (e) => {
        e.preventDefault();
        crearUsuario.style.display = 'block';
    });

    // cerrar modal
    cerrar.addEventListener('click', () => {
        crearUsuario.style.display = 'none';
    });

    // cerrar modal haciendo click fuera del mismo
    window.addEventListener('click', (e) => {
        if (e.target === crearUsuario) {
            crearUsuario.style.display = 'none';
        }
    });

    // enviar datos de creacion del usuario
    crearUsuarioFormulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nuevoUsuario = document.getElementById('nuevoUsuario').value;
        const nuevaClave = document.getElementById('nuevaClave').value;

        try {
            const response = await fetch(`${api}/api/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: 0, nombre: nuevoUsuario, usuario: nuevoUsuario, clave: nuevaClave, activo: true })
            });

            if (response.ok) {
                alert('Usuario creado exitosamente');
                crearUsuario.style.display = 'none';
            } else {
                alert('Error al crear usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // iniciar sesion 
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuario').value;
        const clave = document.getElementById('clave').value;

        try {
            const response = await fetch(`${api}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, clave })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = '../index.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});