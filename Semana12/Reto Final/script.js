// arreglos
let productos = ["Mouse", "USB", "Teclado", "Audífonos"];
let precios = [45, 35, 70, 60];
let stock = [5, 8, 3, 4];
let carritoCantidades = [0, 0, 0, 0];

function actualizarTablaHTML() {
    for (let i = 0; i < stock.length; i++) {
        let celdaStock = document.getElementById("stock-" + i);
        if (celdaStock) {
            celdaStock.innerText = stock[i];
        }
    }
}

function iniciarCampusMarket() {
    // reiniciar carrito para cada nueva ejecución de caja
    carritoCantidades = [0, 0, 0, 0];
    let continuarMenu = true;

    while (continuarMenu) {
        let menuStr = "+ CAMPUSMARKET UTP +\n" +
                      "Seleccione un producto:\n";
        for (let i = 0; i < productos.length; i++) {
            menuStr += (i + 1) + ". " + productos[i] + " - S/. " + precios[i] + " (Stock: " + stock[i] + ")\n";
        }
        menuStr += "0. Finalizar compra y pagar";

        let opcionPrompt = prompt(menuStr);

        // Si cancela o deja vacío el menú principal
        if (opcionPrompt === null) {
            alert("Operación cancelada. Regresando al inicio.");
            return;
        }

        let opcion = Number(opcionPrompt);

        if (opcion === 0) {
            continuarMenu = false;
        } else if (opcion >= 1 && opcion <= productos.length) {
            let index = opcion - 1;

            // Pedir cantidad
            let entradaCant = prompt("¿Cuántas unidades de " + productos[index] + " desea llevar?");
            
            if (entradaCant === null) {
                alert("Compra de este producto cancelada.");
                continue;
            }

            let cantidad = Number(entradaCant);

            // Validar que sea entero positivo
            if (entradaCant.trim() === "" || !Number.isInteger(cantidad) || cantidad <= 0) {
                alert("Error: Debe ingresar una cantidad entera mayor a 0.");
                continue;
            }

            // Validar stock disponible
            let stockDisponibleReal = stock[index] - carritoCantidades[index];
            if (cantidad > stockDisponibleReal) {
                alert("Stock insuficiente. Solo hay " + stockDisponibleReal + " unidades disponibles de " + productos[index] + ".");
                continue;
            }

            // Confirmar la operación antes de aplicar cambios
            let confirmarCompra = confirm("¿Confirma agregar " + cantidad + " unidad(es) de " + productos[index] + " al carrito?");
            if (confirmarCompra) {
                carritoCantidades[index] += cantidad;
                alert("¡Producto agregado exitosamente al carrito!");
            } else {
                alert("Se canceló la adición del producto.");
            }

        } else {
            alert("Opción inválida. Intente nuevamente.");
        }
    }

    // calculo del subtotal general
    let subtotal = 0;
    let resumenProductos = "";
    let tieneArticulos = false;

    for (let i = 0; i < productos.length; i++) {
        if (carritoCantidades[i] > 0) {
            tieneArticulos = true;
            let subTotalItem = carritoCantidades[i] * precios[i];
        }
    }

    // recalculo del subtotal
    subtotal = 0;
    for (let i = 0; i < productos.length; i++) {
        if (carritoCantidades[i] > 0) {
            let parcial = carritoCantidades[i] * precios[i];
            subtotal += parcial;
            resumenProductos += "- " + carritoCantidades[i] + "x " + productos[i] + " (S/ " + parcial + ")\n";
        }
    }

    if (!tieneArticulos) {
        alert("No se realizaron compras en esta sesión.");
        return;
    }

    // Aplicar reglas de descuento
    let descuentoMonto = 0;
    let etiquetaDescuento = "0%";

    if (subtotal >= 150) {
        descuentoMonto = subtotal * 0.15;
        etiquetaDescuento = "15%";
    } else if (subtotal >= 80) {
        descuentoMonto = subtotal * 0.08;
        etiquetaDescuento = "8%";
    }

    let subtotalConDescuento = subtotal - descuentoMonto;

    // bolsa
    let quiereBolsa = confirm("¿Desea solicitar bolsa por un costo adicional de S/ 2.00?");
    let costoBolsa = 0;
    if (quiereBolsa) {
        costoBolsa = 2.00;
    }

    let totalFinal = subtotalConDescuento + costoBolsa;

    // descontar el stock solo cuando se complete la compra
    for (let i = 0; i < stock.length; i++) {
        stock[i] -= carritoCantidades[i];
    }
    actualizarTablaHTML();

    // comprobante
    let comprobante = "=== COMPROBANTE DE PAGO CAMPUSMARKET ===\n\n" +
                      "Productos adquiridos:\n" + resumenProductos + "\n" +
                      "Subtotal: S/ " + subtotal.toFixed(2) + "\n" +
                      "Descuento aplicado (" + etiquetaDescuento + "): -S/ " + descuentoMonto.toFixed(2) + "\n" +
                      "Bolsa opcional: S/ " + costoBolsa.toFixed(2) + "\n" +
                      "-----------------------------------\n" +
                      "TOTAL A PAGAR: S/ " + totalFinal.toFixed(2) + "\n\n" +
                      "¡Gracias por su compra en UTP!";

    alert(comprobante);
}