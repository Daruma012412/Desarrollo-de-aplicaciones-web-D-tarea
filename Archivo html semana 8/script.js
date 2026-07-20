const formulario = document.getElementById("formPedido");

const cliente = document.getElementById("cliente");
const producto = document.getElementById("producto");
const descripcion = document.getElementById("descripcion");
const categoria = document.getElementById("categoria");

const errorCliente = document.getElementById("errorCliente");
const errorProducto = document.getElementById("errorProducto");
const errorDescripcion = document.getElementById("errorDescripcion");
const errorCategoria = document.getElementById("errorCategoria");

const lista = document.getElementById("listaPedidos");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");

const spinner = document.getElementById("spinner");
const modalBody = document.querySelector("#modalInfo .modal-body");

// Arreglo de objetos
let pedidos = [];

// ================= VALIDACIONES =================

function validarCliente() {

    if (cliente.value.trim().length < 3) {

        cliente.classList.add("is-invalid");
        cliente.classList.remove("is-valid");

        errorCliente.textContent =
            "Debe ingresar mínimo 3 caracteres.";

        return false;
    }

    cliente.classList.remove("is-invalid");
    cliente.classList.add("is-valid");

    errorCliente.textContent = "";

    return true;
}

function validarProducto() {

    if (producto.value.trim().length < 5) {

        producto.classList.add("is-invalid");
        producto.classList.remove("is-valid");

        errorProducto.textContent =
            "Ingrese un título válido.";

        return false;
    }

    producto.classList.remove("is-invalid");
    producto.classList.add("is-valid");

    errorProducto.textContent = "";

    return true;
}

function validarDescripcion() {

    if (descripcion.value.trim().length < 15) {

        descripcion.classList.add("is-invalid");
        descripcion.classList.remove("is-valid");

        errorDescripcion.textContent =
            "La descripción debe tener mínimo 15 caracteres.";

        return false;
    }

    descripcion.classList.remove("is-invalid");
    descripcion.classList.add("is-valid");

    errorDescripcion.textContent = "";

    return true;
}

function validarCategoria() {

    if (categoria.value == "") {

        categoria.classList.add("is-invalid");
        categoria.classList.remove("is-valid");

        errorCategoria.textContent =
            "Seleccione una categoría.";

        return false;
    }

    categoria.classList.remove("is-invalid");
    categoria.classList.add("is-valid");

    errorCategoria.textContent = "";

    return true;
}

// ================= EVENTOS =================

cliente.addEventListener("input", validarCliente);
cliente.addEventListener("blur", validarCliente);

producto.addEventListener("input", validarProducto);
producto.addEventListener("blur", validarProducto);

descripcion.addEventListener("input", validarDescripcion);
descripcion.addEventListener("blur", validarDescripcion);

categoria.addEventListener("change", validarCategoria);

// ================= MOSTRAR PEDIDOS =================

function mostrarPedidos() {

    lista.innerHTML = "";

    total.textContent = pedidos.length;

    if (pedidos.length === 0) {

        lista.innerHTML = `
            <div class="alert alert-warning">
                No existen pedidos registrados.
            </div>
        `;

        return;
    }

    pedidos.forEach((pedido, indice) => {

        lista.innerHTML += `

        <div class="col-md-6 col-lg-4">

            <div class="card shadow h-100">

                <div class="card-body">

                    <h5 class="card-title">
                        ${pedido.cliente}
                    </h5>

                    <p>
                        <strong>Pedido:</strong>
                        ${pedido.producto}
                    </p>

                    <p>
                        <strong>Categoría:</strong>
                    </p>

                    <span class="badge bg-secondary mb-3">
                        ${pedido.categoria}
                    </span>

                    <div class="d-grid gap-2">

                        <button
                            class="btn btn-primary btn-sm"
                            onclick="verDetalle(${indice})"
                            data-bs-toggle="modal"
                            data-bs-target="#modalInfo">

                            Ver detalles

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarPedido(${indice})">

                            Eliminar

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}

// ================= MODAL =================

function verDetalle(indice) {

    const pedido = pedidos[indice];

    modalBody.innerHTML = `

        <h4>${pedido.cliente}</h4>

        <hr>

        <p>

            <strong>Pedido:</strong>

            ${pedido.producto}

        </p>

        <p>

            <strong>Descripción:</strong>

        </p>

        <p>

            ${pedido.descripcion}

        </p>

        <p>

            <strong>Categoría:</strong>

            <span class="badge bg-secondary">

                ${pedido.categoria}

            </span>

        </p>

    `;

}

// ================= ELIMINAR =================

function eliminarPedido(indice) {

    pedidos.splice(indice, 1);

    mensaje.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show">

            Pedido eliminado correctamente.

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert">
            </button>

        </div>
    `;

    mostrarPedidos();

}

// ================= REGISTRAR =================

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const c = validarCliente();
    const p = validarProducto();
    const d = validarDescripcion();
    const ca = validarCategoria();

    if (!(c && p && d && ca)) {

        mensaje.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show">

                Corrija los errores antes de registrar.

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert">
                </button>

            </div>
        `;

        return;
    }

    spinner.classList.remove("d-none");

    setTimeout(() => {

        spinner.classList.add("d-none");

        pedidos.push({

            cliente: cliente.value,

            producto: producto.value,

            descripcion: descripcion.value,

            categoria: categoria.value

        });

        mensaje.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show">

                Pedido registrado correctamente.

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert">
                </button>

            </div>
        `;

        mostrarPedidos();

        formulario.reset();

        cliente.classList.remove("is-valid");
        producto.classList.remove("is-valid");
        descripcion.classList.remove("is-valid");
        categoria.classList.remove("is-valid");

    }, 1500);

});

// Mostrar pedidos al iniciar
mostrarPedidos();