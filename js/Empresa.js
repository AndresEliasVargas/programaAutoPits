'use strict';

class Empresa {
    constructor(psNombre) {
        this.nombre = psNombre;
        this.autos = [];
        this.cambioAceites = [];
        this.aceites = [];
    };

    //Agregar Auto
    agregarAuto(pnuevoAuto) {
        for (let i = 0; i < this.autos.length; i++) {
            if (pnuevoAuto.placa === this.autos[i].placa) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Ya se encuentra registrado el auto: ' +
                        pnuevoAuto.placa
                });
                //Retorna a la variable el estado de los datos
                return false;
            };
        };

        this.autos.push(pnuevoAuto);

        //Debe estar aquí porque si se pone en el controlador genera una erronea funcionalidad
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,

        });
        Toast.fire({
            type: 'success',
            title: 'Auto almacenado correctamente'
        });

        //Retorna a la variable el estado de los datos
        return true;
    };

    //Eliminar
    eliminarAuto(pPlaca) {
        //sweetalert2 - Botones de cancelar y eliminar, estilos
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-3',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });

        //Alert de confirmación
        swalWithBootstrapButtons.fire({
            title: '¿Está seguro de eliminar el Auto?',
            text: "Usted no podrá revertir este paso!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                // Métodos que permiten los cambios en la persona y la interfaz
                for (let i = 0; i < this.autos.length; i++) {
                    if (pPlaca === this.autos[i].placa) {
                        let placa = this.autos[i].placa;

                        this.autos.splice(i, 1);
                        actualizarTabla();

                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'El automovil con la placa ' + placa + ' ha sido eliminado(a).',
                            'success'
                        )
                    }
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'El auto no fue eliminado :)',
                    'error'
                )
            }
        });
    };

    //Agregar los cambios de aceite desde la propiedad de Agregar principal
    agregarCambiosAceite(psPlaca) {
        let cantidad = Number(prompt('Cantidad de cambios de aceite'));
        let notas = prompt('Coloque por favor un mensaje para el registro de este dato');

        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        let dFechaCompleta = new Date();
        const dMonth = meses[dFechaCompleta.getMonth()];
        const dDay = dFechaCompleta.getDate();
        const dYear = dFechaCompleta.getFullYear();
        let sFechaCompleta;

        sFechaCompleta = dDay + '-' + dMonth + '-' + dYear;

        //Esto permite al usuario dejar por default 0 en caso de que a la hora del registro deje el campo vacío o surja algún tipo de error
        if (cantidad == '' || cantidad == null || cantidad == undefined || cantidad == NaN) {
            cantidad = 0;
        }

        let nuevoRegistroCA = new CambioAceite(psPlaca, sFechaCompleta, notas);
        let estadoDatos = this.cambioAceites.push(nuevoRegistroCA);

        if (estadoDatos) {
            limpiarCampos();
            actualizarTabla();
        }

        return cantidad;
    };

    //Sumatoria de cambios de aceite
    agregarSumatoria(paceiteForm, pnPlaca) {



        //  SUmatoria para aumentar en pantalla y el array la actualizacion de los cambios de aceite.
        for (let i = 0; i < this.autos.length; i++) {
            if (pnPlaca === this.autos[i].placa) {
                let cantidad = Number(prompt('Cantidad de cambios de aceite realizados para actualizar'));
                this.autos[i].cambioAceite += cantidad;
            }
        };
    };

};