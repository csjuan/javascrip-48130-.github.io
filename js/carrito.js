const tablaCarrito = document.getElementById("tablaCarrito");
const cardTotal = document.getElementById("cardTotal");

function renderJuegoCarritoHTML(listaJuegoCarrito) {
  const tr = document.createElement("tr");
  tr.classList.add("juegoEnCarritoContenedor");
  tr.innerHTML += `
        <td> <img src="${listaJuegoCarrito.imagen
    }" class="imgJuegoCarrito" alt="${listaJuegoCarrito.nombreJuego
    }" width="95px"></td>
        <td><h3 class="nombreJuegoCarrito">${listaJuegoCarrito.nombreJuego
    }</h3></td>
        <td><h5 class="precioCarrito">$${listaJuegoCarrito.precio}</h5></td>
        <td>
            <input id="btnResta${listaJuegoCarrito.id
    }" class="btnRe" type="button" value="-">
            <h5 class="cantidadCarrito" id="cantidadCarritoTabla">${listaJuegoCarrito.cantidad
    }</h5>
            <input id="btnSuma${listaJuegoCarrito.id
    }" class="btnSu" value="+" type="button">
        </td>
        <td><h5 class="subTotalCarrito">$${(
      listaJuegoCarrito.precio * listaJuegoCarrito.cantidad
    ).toFixed(2)}</h5></td>
        <td><a href="#" id="btnEliminar${listaJuegoCarrito.id
    }"><img src="img/basura.png"" class="tachoBasuraCarrito" alt="tacho${listaJuegoCarrito.id
    }" width="30px"></a></td>
    `;

  tablaCarrito.appendChild(tr);

  const btnRestaCantidad = document.getElementById(
    `btnResta${listaJuegoCarrito.id}`
  );
  btnRestaCantidad.addEventListener("click", () => {
    resta(listaJuegoCarrito.id);
  });
  const btnSumaCantidad = document.getElementById(
    `btnSuma${listaJuegoCarrito.id}`
  );
  btnSumaCantidad.addEventListener("click", () => {
    suma(listaJuegoCarrito.id);
  });
  const btnEliminarJuego = document.getElementById(
    `btnEliminar${listaJuegoCarrito.id}`
  );
  btnEliminarJuego.addEventListener("click", () => {
    eliminarObjetoDeCarrito(listaJuegoCarrito.id);
    MostrarProductoEnCarrito();
    mostrarValorCarritoIcon();
  });
}

function suma(id) {
  const juegoEnCarrito = carrito.find((juego) => juego.id === id);
  if (juegoEnCarrito.cantidad) {
    juegoEnCarrito.cantidad++;
    console.log(`agrego  ${juegoEnCarrito.nombreJuego} `);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    MostrarProductoEnCarrito();
  }
}

function resta(id) {
  const juegoEnCarrito = carrito.find((juego) => juego.id === id);
  if (juegoEnCarrito.cantidad > 1) {
    juegoEnCarrito.cantidad--;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    MostrarProductoEnCarrito();
  } else {
    juegoEnCarrito.cantidad = 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    MostrarProductoEnCarrito();
  }
}

function MostrarProductoEnCarrito() {
  tablaCarrito.innerHTML = "";

  if (localStorage.getItem("carrito"))
    carrito.forEach((juego) => {
      renderJuegoCarritoHTML(juego);
    });
  MostrarCardTotal();
}
function renderCardCarritoTotal() {
  const divTotal = document.createElement("div");

  divTotal.classList.add("boxCardTotal");
  divTotal.innerHTML = `
      <h2 class="TituloTotalCarrito">TOTAL CARRITO</h2>
      <table class="tableTotalCar">
            <tbody class="tbodyTotalCar">
            <tr class="trTotalCar">
                <th>Subtotal</th>
                <td>
                <span>ARS$${SubtotalPrecioCarrito().toFixed(2)}</span>
                </td>
            </tr>
            <tr class="trTotalCar">
                <th>Envio a domicilio</th>
                <td>
                <label for="CheckBoxEnvio"><span>ARS$${1200}</span></label>
                <input id="checkBoxEnvio" type="checkbox" name="CheckBoxEnvio" value="${1200}">
                </td>
            </tr>
            <tr class="trTotal">
                <th>TOTAL</th>
                <td>
                <span class="precioTotal" id="spaneando">ARS$${SubtotalPrecioCarrito().toFixed(
    2
  )}</span>
                </td>
            </tr>
            </tbody>
      </table>
      <section class="SeccionBtnCompra">
      <button class="btnCompra" id="realizarCompra"><a href="compraConfirm.html">COMPRAR</a></button>
      </section>
    `;
  cardTotal.appendChild(divTotal);

  const checkBoxEnvio = document.getElementById("checkBoxEnvio");
  checkBoxEnvio.addEventListener("click", () => {
    const spaneando = document.getElementById("spaneando");
    spaneando.innerHTML = "";
    spaneando.innerHTML = `ARS$${totalPrecioCarritos().toFixed(2)}`;
  });
  const realizarCompra = document.getElementById("realizarCompra");
  realizarCompra.addEventListener("click", () => {
    const precio = `${totalPrecioCarritos().toFixed(2)}`;
    localStorage.setItem("precioDeCompra", JSON.stringify(precio));
  });
}

function MostrarCardTotal() {
  cardTotal.innerHTML = "";
  if (localStorage.getItem("carrito")) {
    renderCardCarritoTotal();
  }
}
function EjecutarVistaDeCarritoCompleta() {
  MostrarCardTotal();
  MostrarProductoEnCarrito();
}



LimpiarCarritoBtnClick(); 
mostrarValorCarritoIcon();
MostrarProductoEnCarrito(); 