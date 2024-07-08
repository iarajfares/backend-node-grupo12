const api = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').onsubmit = async function (e) {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const clave = document.getElementById('clave').value;
            try {
                const response = await fetch(`${api}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario, clave })
                });
                const data = await response.json();
                if(data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                } else {
                    alert('No se pudo iniciar sesion');
                }
            } catch (error) {
                alert('Error')
            }
        };
    }

    
})