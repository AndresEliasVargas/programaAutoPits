'use strict';

//Campos de inputs
const inputPlaca = document.querySelector('#placaTxt');
const inputModelo = document.querySelector('#modeloTxt');
const inputMarca = document.querySelector('#marcaTxt');
const inputCambiosAceite = document.querySelector('#cambiosAceiteTxt');
const outputTabla = document.querySelector('#tblAutos');

//botones
const btnAgregar = document.querySelector('#btnAgregar');

//Regular Expressions
const regexSimbolos = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\\]/;
const regexLetras = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/;
const regexNumeros = /^([0-9])/;
const regexNumerosLetras = /^([0-9])[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/

//Datos Quemados
const nombreEmpresa = new Empresa('Autos La Fortuna');
const carro1 = new Auto('230234', 'Yaris', 'Toyota', 2);
const carro2 = new Auto('342123', 'Canry', 'Toyota', 3);
const carro3 = new Auto('BBB234', 'Accent', 'Hyundai', 2);

nombreEmpresa.agregarAuto(carro1);
nombreEmpresa.agregarAuto(carro2);
nombreEmpresa.agregarAuto(carro3);

const validarCampos = () => {
    let sPlaca = inputPlaca.value;
    let sModelo = inputModelo.value;
    let sMarca = inputMarca.value;
    let nCambiosAceite = nombreEmpresa.agregarCambiosAceite();
    
    let nuevoAuto = new Auto(sPlaca, sModelo, sMarca, nCambiosAceite);

    let validarEstado = true;
    let bError = validar(sPlaca, sModelo, sMarca);

    //Validadores
    if (bError) {
        if (nCambiosAceite < 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El campo no puede ser menor a 0',
            })
            validarEstado = false;
        } else if (sPlaca === '' || sModelo === '' || sMarca === '' || nCambiosAceite === '') {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacios',
            })
            validarEstado = false;
        }; 
    } else {
        //AgregarDatos
        let estadoDatos = nombreEmpresa.agregarAuto(nuevoAuto);
        if (estadoDatos) {
            // limpiarCampos();
            actualizarTabla();
        }
    }
};

//Valida los campos que se colocan en rojo
const validar = (psPlaca, psModelo, psMarca) => {
    let bError = false;

    //Valida Placa
    if (regexNumerosLetras.test(psPlaca) == true || psPlaca == '' || psPlaca == null || psPlaca == undefined) {
        bError = true;
        inputPlaca.classList.add('border-danger');
    } else {
        inputPlaca.classList.remove('border-danger');
    };

    //Valida Modelo
    if (regexLetras.test(psModelo) == false || psModelo == '' || psModelo == null || psModelo == undefined) {
        bError = true;
        inputModelo.classList.add('border-danger');
    } else {
        inputModelo.classList.remove('border-danger');
    };

    //Valida Marca
    if (regexLetras.test(psMarca) == false || psMarca == '' || psMarca == null || psMarca == undefined) {
        bError = true;
        inputMarca.classList.add('border-danger');
    } else {
        inputMarca.classList.remove('border-danger');
    };

    return bError;
};

//Actualizar Tabla
const actualizarTabla = () => {
    const tbody = document.querySelector('#tblAutos tbody');

    //Limpia la tabla
    for (let i = (outputTabla.rows.length - 1); i > 0; i--) {
        outputTabla.deleteRow(i);
    }

    //Crea el row, las columnas y los botones de la tabla
    for (let i = 0; i < nombreEmpresa.autos.length; i++) {
        //crea el row
        let fila = tbody.insertRow();

        //crea las celdas
        let celdaPlaca = fila.insertCell();
        let celdaModelo = fila.insertCell();
        let celdaMarca = fila.insertCell();
        let celdaCambios = fila.insertCell();
        let celdaMostrar = fila.insertCell();
        let celdaAgregarCambios = fila.insertCell();
        let celdaEliminarAuto = fila.insertCell();

        //crea los botones
        let btnMostrar = document.createElement('button');
        let btnAgregar = document.createElement('button');
        let btnEliminar = document.createElement('button');

        //Inserta los datos en la celda
        celdaPlaca.innerHTML = nombreEmpresa.autos[i].placa;
        celdaModelo.innerHTML = nombreEmpresa.autos[i].modelo;
        celdaMarca.innerHTML = nombreEmpresa.autos[i].marca;
        celdaCambios.innerHTML = nombreEmpresa.autos[i].cambioAceite;

        //Inserta boton AgregarFondos
        btnMostrar.setAttribute('id', 'btnMostrar');
        btnMostrar.className = 'btn btn-success btn-block';
        btnMostrar.innerHTML = 'Mostrar';
        btnMostrar.cliente = nombreEmpresa.autos[i];
        btnMostrar.dataset.placa = nombreEmpresa.autos[i].placa;
        btnMostrar.onclick = mostrar;
        celdaMostrar.appendChild(btnMostrar);

        //Inserta el boton Cobrar
        btnAgregar.setAttribute('id', 'btnAgregar');
        btnAgregar.className = 'btn btn-warning btn-block';
        btnAgregar.innerHTML = 'Agregar';
        btnAgregar.cliente = nombreEmpresa.autos[i];
        btnAgregar.dataset.placa = nombreEmpresa.autos[i].placa;
        btnAgregar.onclick = agregarCambiosAceiteSum;
        celdaAgregarCambios.appendChild(btnAgregar);

        //Inserta el boton Eliminar
        btnEliminar.setAttribute('id', 'btnEliminar');
        btnEliminar.className = 'btn btn-danger btn-block';
        btnEliminar.innerHTML = 'Eliminar';
        btnEliminar.cliente = nombreEmpresa.autos[i];
        btnEliminar.dataset.placa = nombreEmpresa.autos[i].placa;
        btnEliminar.onclick = removerAuto;
        celdaEliminarAuto.appendChild(btnEliminar);
    }
};

const mostrar = (e) => {
    console.log(e.target.dataset.placa);
};

const agregarCambiosAceiteSum = (e) => {
    //console.log(e.target.dataset.email);
    console.log(e.target.dataset.placa);
};

const removerAuto = (e) => {
    // console.log(e.target.dataset.placa);
    nombreEmpresa.eliminarAuto(e.target.dataset.placa);
};

actualizarTabla();

//Eventos de Botones
btnAgregar.addEventListener('click', validarCampos);