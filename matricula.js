Vue.component('v-select-alumno',VueSelect.VueSelect);
Vue.component('component-matricula',{
    data:()=>{
        return {
            buscar:'',
            matriculas:[],
            matricula:{
                accion : 'nuevo',
                idMatricula : '',
                codigo: '',
                ciclo: '',
                año : '',
                fecha : '',
            }
        }
    },
    methods:{
        buscandoMatricula(){
            this.obtenerMatriculas(this.buscar);
        },
        eliminarMatricula(matricula){
            if( confirm(`Esta seguro de eliminar la matricula ${matricula.nombre}?`) ){
                this.matricula.accion = 'eliminar';
                this.matricula.idMatricula = matricula.idMatricula;
                this.guardarMatricula();
            }
            this.nuevoMatricula();
        },
        modificarMatricula(datos){
            this.matricula = JSON.parse(JSON.stringify(datos));
            this.matricula.accion = 'modificar';
        },
        guardarMatricula(){
            this.obtenerMatriculas();
            let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            if(this.matricula.accion=="nuevo"){
                this.matricula.idMatricula = generarIdUnicoFecha();
                matriculas.push(this.matricula);
            } else if(this.matricula.accion=="modificar"){
                let index = matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                matriculas[index] = this.matricula;
            } else if( this.matricula.accion=="eliminar" ){
                let index = matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                matriculas.splice(index,1);
            }
            localStorage.setItem('matriculas', JSON.stringify(matriculas));
            this.nuevoMatricula();
            this.obtenerMatriculas();
            this.matricula.msg = 'Matricula procesada con exito';
        },
        obtenerMatriculas(valor=''){
            this.matriculas = [];
            let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            this.matriculas = matriculas.filter(matricula=>matricula.ciclo.toLowerCase().indexOf(valor.toLowerCase())>-1);
             
            this.alumnos = [];
            let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
            this.alumnos = alumnos.map(alumno=>{
                return {
                    label: alumno.nombre,
                }
            });
        },
        nuevoMatricula(){
            this.matricula.accion = 'nuevo';
            this.matricula.idMatricula = '';
            this.matricula.codigo = '';
            this.matricula.ciclo = '';
            this.matricula.año = '';
            this.matricula.fecha = '';
        }
    },
    created(){
        this.obtenerMatriculas();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carMatricula">
                <div class="card-header bg-primary">
                    Registro de Matriculas
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carMatricula" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarMatricula" @reset="nuevoMatricula">
                        
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="matricula.codigo" pattern="[A-Z0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-2">
                                Alumno:
                            </div>
                            <div class="col col-md-3">
                                <v-select-alumno v-model="matricula.alumno" 
                                    :options="alumnos" placeholder="Seleccione una alumno"/>
                            </div>
                        </div>
                        
                        <div class="row p-1">
                            <div class="col col-md-2">Ciclo:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el ciclo" v-model="matricula.ciclo" pattern="[0-9.]{1,3}" required type="number" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-2">Año:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el año" v-model="matricula.año" pattern="[0-9.]{1,10}" required type="text" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-2">Fecha de Matricula:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la fecha" v-model="matricula.fecha" pattern="{0000-00-00}" required type="date" class="form-control form-control-sm">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="matricula.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ matricula.msg }}
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
            <div class="card text-white" id="carBuscarMatricula">
                <div class="card-header bg-primary">
                    Busqueda de Matriculas
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarMatricula" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoMatricula" v-model="buscar" placeholder="Buscar aqui" class="form-control" type="text" >
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
                            <tr v-for="item in matriculas" @click='modificarMatricula( item )' :key="item.idMatricula">
                                <td>{{item.codigo}}</td>
                                <td>{{item.alumno.label}}</td>
                                <td>{{item.ciclo}}</td>
                                <td>{{item.año}}</td>
                                <td>{{item.fecha}}</td>
                                    <button class="btn btn-danger" @click="eliminarMatricula(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});