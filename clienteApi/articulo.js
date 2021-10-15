const endpoint = 'http://localhost:4000/api/articulos/';
var frmArticulo = new bootstrap.Modal(document.getElementById('frmArticulo'))
let descripcion = document.getElementById('descripcion')
let precio = document.getElementById('precio')
let existencia= document.getElementById('existencia')
let formularioArticulo = document.getElementById('formularioArticulo')
var codigo = 0;
let opcion = '';
// Crear nuevo articulo
let btnCrear = document.getElementById('btnCrear');
btnCrear.addEventListener('click', () => {
  descripcion.value = '';
  precio.value = '';
  existencia = '';
  opcion = 'crear';
  frmArticulo.show()
})
//llenar la tabla con los datos de la api
fetch(endpoint)
  .then(response => response.json())
  .then(datos => {
    let tablaDatos = document.getElementById('tablaDatos');
    for (let i = 0; i < datos.length; i++) {
      tablaDatos.innerHTML += ` 
        <tr>
          <td>${datos[i].codigo}</td>
          <td>${datos[i].descripcion}</td>
          <td>${datos[i].precio}</td>
          <td>${datos[i].existencia}</td>    
          <td>  <button type="button" class="btnEditar btn btn-primary"  data-bs-toggle="modal" data-bs-target="#frmEditar" >  Editar</button>    </td>    
          <td> <a class="btnborrar btn btn-danger">borrar</a></td>
        </tr>
        `
    }
  })

//MÉTODO PARA CAPTURAR LINEA DE LA TABLA Y PASARLA A EDICION O BORRADO
const on = (element, event, selector, handler) => {
  element.addEventListener(event, e => {
    if (e.target.closest(selector)) {
      handler(e)
    }
  })
}

//BORRAR UN REGISTRO

on(document, 'click', '.btnborrar', e => {
  const fila = e.target.parentNode.parentNode;
  codigo = fila.firstElementChild.innerHTML;  //captura el codigo de la linea seleccionada
  alertify.confirm('Seguro que desea borrar',
    function () {
      fetch(endpoint + codigo, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => location.reload())
    },
    function () {
      alertify.error('Cancel')
    });

})

//Llenado del formulario para editar
on(document, 'click', '.btnEditar', e => {
  const fila = e.target.parentNode.parentNode;
  codigo = fila.children[0].innerHTML;
  descripcion.value = fila.children[1].innerHTML;
  precio.value = fila.children[2].innerHTML;
  existencia.value = fila.children[3].innerHTML;
  opcion = 'editar'
  frmArticulo.show()
})

//Accion de guardar o editar
formularioArticulo.addEventListener('submit', (e) => {
  e.preventDefault(); //prevenir envio automatico
  if (opcion == 'crear') {
    fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          descripcion: descripcion.value,
          precio: precio.value,
          existencia: existencia.value
        })
      })
      .then(response => response.json())
      .then(response => location.reload())
  }
  if (opcion == 'editar') {
    fetch(endpoint + codigo, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        descripcion: descripcion.value,
        precio: precio.value,
        existencia: existencia.value
      })
    })
    .then(response => response.json())
    .then(response => location.reload())
  }
frmArticulo.hide();
})











