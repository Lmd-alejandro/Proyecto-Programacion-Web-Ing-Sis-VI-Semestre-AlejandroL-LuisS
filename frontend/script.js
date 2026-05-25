const API = "http://localhost:3000/api/tutores";

const contenedor = document.getElementById("contenedorTutores");

const form = document.getElementById("formTutor");

const adminSection = document.getElementById("adminSection");

const userBox = document.getElementById("userBox");

const usuario = JSON.parse(localStorage.getItem("usuario"));

const modalReservas = document.getElementById("modalReservas");

const listaReservas = document.getElementById("listaReservas");

if (!usuario) {
  window.location.href = "login.html";
}

if (userBox) {
  userBox.innerHTML = `Bienvenido ${usuario.nombre}`;
}

if (usuario.rol === "admin") {
  adminSection.style.display = "block";
} else {
  adminSection.style.display = "none";
}

async function cargarTutores() {
  try {
    const response = await fetch(API);

    const tutores = await response.json();

    contenedor.innerHTML = "";

    tutores.forEach((tutor) => {
      contenedor.innerHTML += `

            <div class="tutor-card">

                <div class="tutor-image">

                    <img
                    src="${tutor.imagen}"
                    alt="${tutor.nombre}">

                </div>

                <div class="tutor-meta">

                    <h3>
                        ${tutor.nombre}
                    </h3>

                    <p class="subject">
                        ${tutor.materia}
                    </p>

                    <p class="location">
                        ${tutor.ciudad}
                    </p>

                    <p class="description">
                        ${tutor.descripcion}
                    </p>

                    <div class="card-footer">

                        <span class="price">
                            ${tutor.precio}
                        </span>

                    </div>

                    ${
                      usuario.rol === "admin"
                        ? `

                        <div class="card-actions">

                            <button
                            class="edit-btn"
                            onclick="editarTutor(${tutor.id})">

                                Editar

                            </button>

                            <button
                            class="delete-btn"
                            onclick="eliminarTutor(${tutor.id})">

                                Eliminar

                            </button>

                        </div>

                        `
                        : `

                        <div class="card-actions">

                            <button
                            class="card-btn"
                            onclick="reservarClase('${tutor.nombre}')">

                                Reservar clase

                            </button>

                        </div>

                        `
                    }

                </div>

            </div>

            `;
    });
  } catch (error) {
    console.log(error);
  }
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoTutor = {
      nombre: document.getElementById("nombre").value,

      materia: document.getElementById("materia").value,

      ciudad: document.getElementById("ciudad").value,

      precio: document.getElementById("precio").value,

      descripcion: document.getElementById("descripcion").value,

      imagen: document.getElementById("imagen").value,
    };

    await fetch(API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(nuevoTutor),
    });

    form.reset();

    cargarTutores();
  });
}

async function eliminarTutor(id) {
  const confirmar = confirm("Deseas eliminar este tutor?");

  if (!confirmar) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  cargarTutores();
}

async function editarTutor(id) {
  const nuevoNombre = prompt("Nuevo nombre");

  if (!nuevoNombre) return;

  await fetch(`${API}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nombre: nuevoNombre,
    }),
  });

  cargarTutores();
}

async function reservarClase(nombreTutor) {
  const fecha = prompt("Ingresa la fecha (YYYY-MM-DD)");

  if (!fecha) return;

  const hora = prompt("Ingresa la hora");

  if (!hora) return;

  try {
    await fetch(
      "http://localhost:3000/api/reservas",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          estudiante: usuario.nombre,

          tutor: nombreTutor,

          fecha,
          hora,
        }),
      },
    );

    alert("Reserva creada correctamente");
  } catch (error) {
    console.log(error);

    alert("error servidor");
  }
}

async function abrirReservas() {
  modalReservas.style.display = "flex";

  listaReservas.innerHTML = "<p>Cargando...</p>";

  try {
    const response = await fetch("http://localhost:3000/api/reservas");

    const reservas = await response.json();

    const misReservas = reservas.filter(
      (reserva) => reserva.estudiante === usuario.nombre,
    );

    listaReservas.innerHTML = "";

    if (misReservas.length === 0) {
      listaReservas.innerHTML = `
            <p>
              No tienes reservas
            </p>
            `;
    } else {
      misReservas.forEach((reserva) => {
        listaReservas.innerHTML += `
                <div class="reserva-card">

                    <h3>
                      ${reserva.tutor}
                    </h3>

                    <p>
                      Fecha:
                      ${reserva.fecha}
                    </p>

                    <p>
                      Hora:
                      ${reserva.hora}
                    </p>

                </div>
                `;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function cerrarModalReservas() {
  modalReservas.style.display = "none";
}

function cerrarSesion() {
  localStorage.removeItem("usuario");

  window.location.href = "login.html";ç
}

cargarTutores();
