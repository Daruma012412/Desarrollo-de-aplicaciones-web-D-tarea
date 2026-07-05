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

let contador = 0;

function validarCliente() {

    if (cliente.value.trim().length < 3) {

        cliente.classList.add("is-invalid");
        cliente.classList.remove("is-valid");

        errorCliente.textContent = "Debe ingresar mínimo 3 caracteres.";

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

        errorProducto.textContent = "Ingrese un título válido.";

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

        errorDescripcion.textContent = "La descripción debe tener mínimo 15 caracteres.";

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

        errorCategoria.textContent = "Seleccione una categoría.";

        return false;
    }

    categoria.classList.remove("is-invalid");
    categoria.classList.add("is-valid");

    errorCategoria.textContent = "";

    return true;
}

cliente.addEventListener("input", validarCliente);
cliente.addEventListener("blur", validarCliente);

producto.addEventListener("input", validarProducto);
producto.addEventListener("blur", validarProducto);

descripcion.addEventListener("input", validarDescripcion);
descripcion.addEventListener("blur", validarDescripcion);

categoria.addEventListener("change", validarCategoria);
categoria.addEventListener("blur", validarCategoria);

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const c = validarCliente();
    const p = validarProducto();
    const d = validarDescripcion();
    const ca = validarCategoria();

    if (!(c && p && d && ca)) {

        mensaje.innerHTML =
            '<div class="alert alert-danger">Corrija los errores antes de registrar.</div>';

        return;
    }

    mensaje.innerHTML =
        '<div class="alert alert-success">Pedido registrado correctamente.</div>';

    const card = document.createElement("div");

    card.className = "card p-3 mt-3";

    card.innerHTML = `
        <h5>${cliente.value}</h5>

        <p><strong>Pedido:</strong> ${producto.value}</p>

        <p><strong>Descripción:</strong> ${descripcion.value}</p>

        <span class="badge bg-secondary">${categoria.value}</span>

        <br><br>

        <button class="btn btn-danger btn-sm eliminar">
            Eliminar
        </button>
    `;

    card.querySelector(".eliminar").addEventListener("click", function () {

        card.remove();

        contador--;

        total.textContent = contador;

    });

    lista.appendChild(card);

    contador++;

    total.textContent = contador;

    formulario.reset();

    cliente.classList.remove("is-valid");
    producto.classList.remove("is-valid");
    descripcion.classList.remove("is-valid");
    categoria.classList.remove("is-valid");

});