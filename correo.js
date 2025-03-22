function changeColor() {
    let color = document.getElementById("colorPicker").value;
    document.getElementById("body").style.color = color;
}

function changeFontSize() {
    let fontSize = document.getElementById("fontSize").value;
    document.getElementById("body").style.fontSize = fontSize;
}

function changeFontStyle() {
    let fontStyle = document.getElementById("fontStyle").value;
    let body = document.getElementById("body");

    if (fontStyle === "bold") {
        body.style.fontWeight = "bold";
        body.style.fontStyle = "normal";
    } else if (fontStyle === "italic") {
        body.style.fontStyle = "italic";
        body.style.fontWeight = "normal";
    } else {
        body.style.fontStyle = "normal";
        body.style.fontWeight = "normal";
    }
}

function searchEmail() {
    let query = document.querySelector("header input[type='search']").value.trim();

    // Eliminar resaltados anteriores
    let marks = document.querySelectorAll("mark");
    marks.forEach(mark => {
        mark.outerHTML = mark.innerHTML;
    });

    if (query === "") return;

    function highlightText(node) {
        if (node.nodeType === 3) { // Nodo de texto
            let regex = new RegExp(query, "gi");
            let matches = node.nodeValue.match(regex);
            if (matches) {
                let span = document.createElement("span");
                span.innerHTML = node.nodeValue.replace(regex, match => `<mark style="background-color: yellow;">${match}</mark>`);
                node.replaceWith(span);
            }
        } else {
            node.childNodes.forEach(highlightText);
        }
    }

    document.body.childNodes.forEach(highlightText);
}

document.querySelector("header input[type='search']").addEventListener("input", searchEmail);

function enviarCorreo() {
    let to = document.getElementById("to").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let body = document.getElementById("body").value.trim();

    if (to === "" || body === "") {
        alert("El destinatario y el cuerpo del correo no pueden estar vacíos.");
        return;
    }

    let resumen = `Resumen del correo:\n\nPara: ${to}\nAsunto: ${subject}\nMensaje: ${body}`;
    let confirmacion = confirm(resumen + "\n\n¿Deseas enviar este correo?");

    if (confirmacion) {
        alert("Correo enviado correctamente.");
    }
}