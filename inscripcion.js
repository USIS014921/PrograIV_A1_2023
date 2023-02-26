Vue.component('v-select-alumno',VueSelect.VueSelect);
Vue.component('component-inscripcion',{
    data:()=>{
        return {
            buscar:'',
            inscripcion:[],
            inscripcion:{
                accion : 'nuevo',
                idInscripcion : '',
                codigo: '',
                ciclo: '',
                año : '',
                fecha : '',
            }
        }
    },
    methods:{
        buscandoInscripcion(){
            this.obtenerInscripcion(this.buscar);
        },
        eliminarInscripcion(inscripcion){
            if( confirm(`Esta seguro de eliminar el inscripcion ${inscripcion.nombre}?`) ){
                this.inscripcion.accion = 'eliminar';
                this.inscripcion.idInscripcion = inscripcion.idInscripcion;
                this.guardarInscripcion();
            }
            this.nuevoInscripcion();
        },
        modificarInscripcion(datos){
            this.inscripcion = JSON.parse(JSON.stringify(datos));
            this.inscripcion.accion = 'modificar';
        },
        guardarInscripcion(){
            this.obtenerInscripcion();
            let inscripcion = JSON.parse(localStorage.getItem('inscripcion')) || [];
            if(this.inscripcion.accion=="nuevo"){
                this.inscripcion.idInscripcion = generarIdUnicoFecha();
                inscripcion.push(this.inscripcion);
            } else if(this.inscripcion.accion=="modificar"){
                let index = inscripcion.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                inscripcion[index] = this.inscripcion;
            } else if( this.inscripcion.accion=="eliminar" ){
                let index = inscripcion.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                inscripcion.splice(index,1);
            }
            localStorage.setItem('inscripcion', JSON.stringify(inscripcion));
            this.nuevoInscripcion();
            this.obtenerInscripcion();
            this.inscripcion.msg = 'Inscripcion procesado con exito';
        },
        obtenerInscripcion(valor=''){
            this.inscripcion = [];
            let inscripcion = JSON.parse(localStorage.getItem('inscripcion')) || [];
            this.inscripcion = inscripcion.filter(inscripcion=>inscripcion.ciclo.toLowerCase().indexOf(valor.toLowerCase())>-1);
             
            //aqui vemos las matriculas 
            this.matriculas = [];
            let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            this.matriculas = matriculas.map(matricula=>{
                return {
                    //id: matricula.idCategoria,
                    label: matricula.codigo,
                }
            });
        },
        nuevoInscripcion(){
            this.inscripcion.accion = 'nuevo';
            this.inscripcion.idInscripcion = '';
            this.inscripcion.codigo = '';
            this.inscripcion.ciclo = '';
            this.inscripcion.año = '';
            this.inscripcion.fecha = '';
        }
    },
    created(){
        this.obtenerInscripcion();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carInscripcion">
                <div class="card-header bg-primary">
                    Registro de Inscripcion
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carInscripcion" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                <form method="post" @submit.prevent="guardarInscripcion" @reset="nuevoInscripcion">
                    
                    <div class="row p-1">
                        <div class="col col-md-2">Codigo:</div>
                        <div class="col col-md-2">
                            <input title="Ingrese el codigo" v-model="inscripcion.codigo" pattern="[A-Za-z]{3,75}" required type="text" class="form-control">
                        </div>
                    </div>

                    <div class="row p-1">
                        <div class="col col-md-2">
                            Alumno:
                        </div>
                        <div class="col col-md-3">
                            <v-select-alumno v-model="inscripcion.nombre" 
                                :options="matriculas" placeholder="Seleccione el nombre"/>
                        </div>
                    </div>
                        
                        <div class="row p-1">
                            <div class="col col-md-2">Ciclo:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el ciclo" v-model="inscripcion.ciclo" pattern="[0-9.]{1,10}" required type="number" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Año:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el año" v-model="inscripcion.año" pattern="[0-9.]{1,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Fecha de Inscripcion:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la fecha" v-model="inscripcion.fecha" pattern="{0000-00-00}" required type="date" class="form-control form-control-sm">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="inscripcion.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ inscripcion.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarInscripcion">
                <div class="card-header bg-primary">
                    Busqueda de Inscripcion
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarInscripcion" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoInscripcion" v-model="buscar" placeholder="Buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>ALUMNO</th>
                                <th>CICLO</th>
                                <th>AÑO</th>
                                <th>FECHA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in inscripcion" @click='modificarInscripcion( item )' :key="item.idInscripcion">
                                <td>{{item.codigo}}</td>
                                <td>{{item.alumno.label}}</td>
                                <td>{{item.ciclo}}</td>
                                <td>{{item.año}}</td>
                                <td>{{item.fecha}}</td>
                                    <button class="btn btn-danger" @click="eliminarInscripcion(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});