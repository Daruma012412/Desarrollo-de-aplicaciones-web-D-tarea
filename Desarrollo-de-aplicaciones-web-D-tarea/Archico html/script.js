const formulario = document.getElementById("formPedido");
const lista = document.getElementById("listaPedidos");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");

let contador = 0;

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const cliente = document.getElementById("cliente").value.trim();
    const producto = document.getElementById("producto").value.trim();
    const categoria = document.getElementById("categoria").value;

    if(cliente==="" || producto==="" || categoria===""){

        mensaje.innerHTML =
        '<div class="alert alert-danger">Complete todos los campos.</div>';

        return;
    }

    mensaje.innerHTML =
    '<div class="alert alert-success">Pedido registrado correctamente.</div>';

    const card = document.createElement("div");

    card.className="card p-3 mt-3";

    card.innerHTML=`

        <h5>${cliente}</h5>

        <p><strong>Pedido:</strong> ${producto}</p>

        <span class="badge bg-secondary">${categoria}</span>

        <br><br>

        <button class="btn btn-danger btn-sm eliminar">
            Eliminar
        </button>

    `;

    card.querySelector(".eliminar").addEventListener("click",function(){

        card.remove();

        contador--;

        total.textContent=contador;

    });

    lista.appendChild(card);

    contador++;

    total.textContent=contador;

    formulario.reset();

});