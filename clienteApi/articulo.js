const endpoint = 'http://localhost:4000/api/articulos/';
var frmArticulo = new bootstrap.Modal(document.getElementById('frmArticulo'))
let detalle = document.getElementById('detalle')
let precio = document.getElementById('precio')
let stock = document.getElementById('stock')
let formularioArticulo = document.getElementById('formularioArticulo')
var id = 0;
let opcion = '';

let btnCrear = document.getElementById('btnCrear');
btnCrear.addEventListener('click', () => {
  detalle.value = '';
  precio.value = '';
  stock.value = '';
  opcion = 'crear';
  frmArticulo.show()
})

fetch(endpoint)
  .then(response => response.json())
  .then(datos => {
    let tablaDatos = document.getElementById('tablaDatos');
    for (let i = 0; i < datos.length; i++) {
      tablaDatos.innerHTML += ` 
        <tr>
          <td>${datos[i].id}</td>
          <td>${datos[i].detalle}</td>
          <td>${datos[i].precio}</td>
          <td>${datos[i].stock}</td>    
          <td>  <button type="button" class="btnEditar btn btn-primary"  data-bs-toggle="modal" data-bs-target="#frmEditar" >  Editar</button>    </td>    
          <td> <a class="btnborrar btn btn-danger">borrar</a></td>
        </tr>
        `
    }
  })

//METODO PARA CAPTURAR LINEA DE LA TABLA
const on = (element, event, selector, handler) => {
  element.addEventListener(event, e => {
    if (e.target.closest(selector)) {
      handler(e)
    }
  })
}
//BORRAR

on(document, 'click', '.btnborrar', e => {
  const fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  alertify.confirm('Seguro que desea borrar',
    function () {
      fetch(endpoint + id, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => location.reload())
    },
    function () {
      alertify.error('Cancel')
    });

})

//el boton editar para tomar los datos a editar
on(document, 'click', '.btnEditar', e => {
  const fila = e.target.parentNode.parentNode;
  id = fila.children[0].innerHTML;
  detalle.value = fila.children[1].innerHTML;
  precio.value = fila.children[2].innerHTML;
  stock.value = fila.children[3].innerHTML;
  opcion = 'editar'
  frmArticulo.show()
})

//guardar o editar
formularioArticulo.addEventListener('submit', (e) => {
  e.preventDefault(); //prevenir envio automatico
  if (opcion == 'crear') {
    fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          detalle: detalle.value,
          precio: precio.value,
          stock: stock.value
        })
      })
      .then(response => response.json())
      .then(response => location.reload())
  }
  if (opcion == 'editar') {
    fetch(endpoint+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        detalle: detalle.value,
        precio: precio.value,
        stock: stock.value
      })
    })
    .then(response => response.json())
    .then(response => location.reload())
  }
frmArticulo.hide();
})











