Vue.component('component-inscripcion',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            inscripcion: [],
            inscripcion:{
                idInscripcion : '',
                codigo : '',
                nombre : '',
            }
        }
    },
    methods:{
        guardarInscripcion(){
            this.listarInscripcion();
            if(this.accion==='nuevo'){
                this.inscripcion.idInscripcion = new Date().getTime().toString(16);
                this.inscripcion.push( JSON.parse( JSON.stringify(this.inscripcion) ) );
            }else if(this.accion==='modificar'){
                let index = this.inscripcion.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                this.inscripcion[index] = JSON.parse( JSON.stringify(this.inscripcion) );
            }else if(this.accion==='eliminar'){
                let index = this.inscripcion.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                this.inscripcion.splice(index,1);
            }
            localStorage.setItem("inscripcion", JSON.stringify(this.inscripcion) );
            this.nuevoInscripcion();
        },
        eliminarInscripcion(inscripcion){
            if( confirm(`Esta seguro de eliminar a ${inscripcion.nombre}?`) ){
                this.accion='eliminar';
                this.inscripcion=inscripcion;
                this.guardarInscripcion();
            }
        },
        nuevoInscripcion(){
            this.accion = 'nuevo';
            this.inscripcion.idInscripcion = '';
            this.inscripcion.codigo = '';
            this.inscripcion.nombre = '';
        },
        modificarInscripcion(inscripcion){
            this.accion = 'modificar';
            this.inscripcion = inscripcion;
        },
        listarInscripcion(){
            this.inscripcion = JSON.parse( localStorage.getItem('inscripcion') || "[]" )
                .filter(inscripcion=>inscripcion.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE INSCRIPCION</div>
                    <div class="card-body">
                        <form id="frmInscripcion" @reset.prevent="nuevoInscripcion" v-on:submit.prevent="guardarInscripcion">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">CODIGO:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de inscripcion de 3 digitos"
                                            v-model="inscripcion.codigo" type="text" class="form-control" name="txtCodigoInscripcion" id="txtCodigoInscripcion">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtNombreInscripcion">NOMBRE:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="inscripcion.nombre" type="text" class="form-control" name="txtNombreInscripcion" id="txtNombreInscripcion">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">LISTADO DE INSCRIPCIONS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listarInscripcion()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>CODIGO</th>
                                    <th colspan="2">NOMBRE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="inscripcion in inscripcion" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)" >
                                    <td>{{ inscripcion.codigo }}</td>
                                    <td>{{ inscripcion.nombre }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarInscripcion(inscripcion)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});