Vue.component('component-materia',{
    data:()=>{
        return {
            buscar:'',
            materias:[],
            materia:{
                accion : 'nuevo',
                idMateria : '',
                codigo: '',
                nombre: '',
            }
        }
    },
    methods:{
        buscandoMateria(){
            this.obtenerMaterias(this.buscar);
        },
        eliminarMateria(materia){
            if( confirm(`Esta seguro de eliminar la materia ${materia.nombre}?`) ){
                this.materia.accion = 'eliminar';
                this.materia.idMateria = materia.idMateria;
                this.guardarMateria();
            }
            this.nuevoMateria();
        },
        modificarMateria(datos){
            this.materia = JSON.parse(JSON.stringify(datos));
            this.materia.accion = 'modificar';
        },
        guardarMateria(){
            this.obtenerMaterias();
            let materias = JSON.parse(localStorage.getItem('materias')) || [];
            if(this.materia.accion=="nuevo"){
                this.materia.idMateria = generarIdUnicoFecha();
                materias.push(this.materia);
            } else if(this.materia.accion=="modificar"){
                let index = materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                materias[index] = this.materia;
            } else if( this.materia.accion=="eliminar" ){
                let index = materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                materias.splice(index,1);
            }
            localStorage.setItem('materias', JSON.stringify(materias));
            this.nuevoMateria();
            this.obtenerMaterias();
        },
        obtenerMaterias(valor=''){
            this.materias = [];
            let materias = JSON.parse(localStorage.getItem('materias')) || [];
            this.materias = materias.filter(materia=>materia.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
                                  
        },
        nuevoMateria(){
            this.materia.accion = 'nuevo';
            this.materia.idMateria = '';
            this.materia.codigo = '';
            this.materia.nombre = '';
            this.materia.direccion = '';
            this.materia.municipio = '';
            this.materia.departamento = '';
            this.materia.telefono = '';
            this.materia.fecha = '';
            this.materia.genero = '';
        }
    },
    created(){
        this.obtenerMaterias();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carMateria">
                <div class="card-header bg-primary">
                    Registro de Materia
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carMateria" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarMateria" @reset="nuevoMateria">
                    <div class="row p-1">
                       <div class="col-3 col-md-2">
                        <label for="txtCodigoMateria">Codigo:</label>
                       </div>
                        <div class="col-6 col-md-3">
                        <input required pattern="[A-Z0-9]{5}" title="Ingrese un Codigo ejemplo:CS123 o MT435"
                            v-model="materia.codigo" type="text" class="form-control" name="txtCodigoMateria"
                            id="txtCodigoMateria">
                        </div>
                     </div>

                        <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtNombreMateria">Nombre:</label>
                        </div>
                        <div class="col-9 col-md-6">
                            <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" v-model="materia.nombre" type="text"
                                class="form-control" name="txtNombreMateria" id="txtNombreMateria">
                        </div>
                    </div>

                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="materia.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ materia.msg }}
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
            <div class="card text-white" id="carBuscarMateria">
                <div class="card-header bg-primary">
                    Busqueda de Materias
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarMateria" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoMateria" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in materias" @click='modificarMateria( item )' :key="item.idMateria">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarMateria(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});