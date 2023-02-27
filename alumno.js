Vue.component('component-alumno',{
    data:()=>{
        return {
            buscar:'',
            alumnos:[],
            alumno:{
                accion : 'nuevo',
                idAlumno : '',
                codigo: '',
                nombre: '',
                direccion: '',
                municipio: '',
                departamento: '',
                telefono: '',
                fecha: '',
                genero: '',
            }
        }
    },
    methods:{
        buscandoAlumno(){
            this.obtenerAlumnos(this.buscar);
        },
        eliminarAlumno(alumno){
            if( confirm(`Esta seguro de eliminar el alumno ${alumno.nombre}?`) ){
                this.alumno.accion = 'eliminar';
                this.alumno.idAlumno = alumno.idAlumno;
                this.guardarAlumno();
            }
            this.nuevoAlumno();
        },
        modificarAlumno(datos){
            this.alumno = JSON.parse(JSON.stringify(datos));
            this.alumno.accion = 'modificar';
        },
        guardarAlumno(){
            this.obtenerAlumnos();
            let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
            if(this.alumno.accion=="nuevo"){
                this.alumno.idAlumno = generarIdUnicoFecha();
                alumnos.push(this.alumno);
            } else if(this.alumno.accion=="modificar"){
                let index = alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                alumnos[index] = this.alumno;
            } else if( this.alumno.accion=="eliminar" ){
                let index = alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                alumnos.splice(index,1);
            }
            localStorage.setItem('alumnos', JSON.stringify(alumnos));
            this.nuevoAlumno();
            this.obtenerAlumnos();
        
        },
        obtenerAlumnos(valor=''){
            this.alumnos = [];
            let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
            this.alumnos = alumnos.filter(alumno=>alumno.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevoAlumno(){
            this.alumno.accion = 'nuevo';
            
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.direccion = '';
            this.alumno.municipio = '';
            this.alumno.departamento = '';
            this.alumno.telefono = '';
            this.alumno.fecha = '';
            this.alumno.genero = '';
        }
    },
    created(){
        this.obtenerAlumnos();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carAlumno">
                <div class="card-header bg-primary">
                    Registro Alumno
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carAlumno" aria-label="Close"></button>
                </div>

                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarAlumno" @reset="nuevoAlumno">
                    <div class="row p-1">
                       <div class="col-3 col-md-1">
                        <label for="txtCodigoAlumno">Codigo:</label>
                       </div>
                        <div class="col-3 col-md-3">
                        <input required pattern="[A-Z0-9]{10}" title="Ingrese un Codigo ejemplo: USIS013090"
                            v-model="alumno.codigo" type="text" class="form-control" name="txtCodigoAlumno"
                            id="txtCodigoAlumno">
                        </div>
                     </div>

                        <div class="row p-1">
                        <div class="col-3 col-md-1">
                            <label for="txtNombreAlumno">Nombre:</label>
                        </div>
                        <div class="col-9 col-md-3">
                            <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" v-model="alumno.nombre" type="text"
                                class="form-control" name="txtNombreAlumno" id="txtNombreAlumno">
                        </div>
                    </div>
                    
                    <div class="row p-1">
                        <div class="col-3 col-md-1">
                            <label for="txtDireccionAlumno">Dirección:</label>
                        </div>
                        <div class="col-9 col-md-3">
                            <input required pattern="[A-Za-zÑñáéíóú., ]{3,75}" v-model="alumno.direccion"
                                type="text" class="form-control" name="txtDireccionAlumno"
                                id="txtDireccionAlumno">
                        </div>
                    </div>
                    
                    <div class="row p-1">
                        <div class="col-3 col-md-1">
                            <label for="txtMunicipioAlumno">Municipio:</label>
                        </div>
                        <div class="col-9 col-md-3">
                            <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" v-model="alumno.municipio"
                                type="text" class="form-control" name="txtMunicipioAlumno"
                                id="txtMunicipioAlumno">
                        </div>
                    </div>
                    
                    <div class="row p-1">
                        <div class="col-3 col-md-1">
                            <label for="txtDepartamentoAlumno">Departamento:</label>
                        </div>
                        <div class="col-9 col-md-3">
                            <select v-model="alumno.departamento" required pattern="[A-Za-zÑñáéíóú., ]{3,75}"
                                type="text" class="form-control" name="txtDepartamentoAlumno"
                                id="txtDepartamentoAlumno">
                                <option>Usulután</option>
                                <option>Cabañas</option>
                                <option>Ahuachapán</option>
                                <option>Chalatenango</option>
                                <option>Cuscatlán</option>
                                <option>La Libertad</option>
                                <option>Morazán</option>
                                <option>La Paz</option>
                                <option>Santa Ana</option>
                                <option>San Miguel</option>
                                <option>San Salvador</option>
                                <option>San Vicente</option>
                                <option>Sonsonate</option>
                                <option>La Unión</option>
                            </select>
                        </div>
                    </div>
                        
                    <div class="row p-1">
                    <div class="col-3 col-md-1">
                        <label for="txtTelefonoAlumno">Teléfono:</label>
                    </div>
                    <div class="col-9 col-md-3">
                        <input v-model="alumno.telefono" title="Ingrese un numero sin espacios ni guiones" pattern="[0-9]{4}-[0-9]{4}" type="text" class="form-control"
                            name="txtTelefonoAlumno" id="txtTelefonoAlumno">
                    </div>
                </div>

                <div class="row p-1">
                    <div class="col-3 col-md-1">
                        <label for="txtFechaAlumno">Fecha de nacimiento:</label>
                    </div>
                    <div class="col-9 col-md-3">
                        <input v-model="alumno.fecha" type="date" class="form-control" name="txtFechaAlumno"
                            id="txtFechaAlumno">
                    </div>
                </div>

                <div class="row p-1">
                    <div class="col-3 col-md-1">
                        <label for="txtGeneroAlumno">Genero:</label>
                    </div>
                    <div class="col-9 col-md-3">
                        <select v-model="alumno.genero" type="text" class="form-control"
                            name="txtGeneroAlumno" id="txtGeneroAlumno">
                            <option>Masculino</option>
                            <option>Femenino</option>
                        </select>
                    </div>
                </div>

                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="alumno.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ alumno.msg }}
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
            <div class="card text-white" id="carBuscarAlumno">
                <div class="card-header bg-primary">
                    Busqueda de Alumnos
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarAlumno" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoAlumno" v-model="buscar" placeholder="Buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>DIRECCION</th>
                                <th>TEL</th>
                                <th>DUI</th>
                                <th>FECHA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in alumnos" @click='modificarAlumno( item )' :key="item.idAlumno">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.direccion}}</td>
                                <td>{{item.telefono}}</td>
                                <td>{{item.departamento}}</td>
                                <td>{{item.fecha}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarAlumno(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});