Vue.component('component-docente',{
    data:()=>{
        return {
            buscar:'',
            docentes:[],
            docente:{
                accion : 'nuevo',
                idDocente : '',
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
        buscandoDocente(){
            this.obtenerDocentes(this.buscar);
        },
        eliminarDocente(docente){
            if( confirm(`Esta seguro de eliminar el docente ${docente.nombre}?`) ){
                this.docente.accion = 'eliminar';
                this.docente.idDocente = docente.idDocente;
                this.guardarDocente();
            }
            this.nuevoDocente();
        },
        modificarDocente(datos){
            this.docente = JSON.parse(JSON.stringify(datos));
            this.docente.accion = 'modificar';
        },
        guardarDocente(){
            this.obtenerDocentes();
            let docentes = JSON.parse(localStorage.getItem('docentes')) || [];
            if(this.docente.accion=="nuevo"){
                this.docente.idDocente = generarIdUnicoFecha();
                docentes.push(this.docente);
            } else if(this.docente.accion=="modificar"){
                let index = docentes.findIndex(docente=>docente.idDocente==this.docente.idDocente);
                docentes[index] = this.docente;
            } else if( this.docente.accion=="eliminar" ){
                let index = docentes.findIndex(docente=>docente.idDocente==this.docente.idDocente);
                docentes.splice(index,1);
            }
            localStorage.setItem('docentes', JSON.stringify(docentes));
            this.nuevoDocente();
            this.obtenerDocentes();
          
        },
        obtenerDocentes(valor=''){
            this.docentes = [];
            let docentes = JSON.parse(localStorage.getItem('docentes')) || [];
            this.docentes = docentes.filter(docente=>docente.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevoDocente(){
            this.docente.accion = 'nuevo';
            this.docente.idDocente = '';
            this.docente.codigo = '';
            this.docente.nombre = '';
            this.docente.direccion = '';
            this.docente.municipio = '';
            this.docente.departamento = '';
            this.docente.telefono = '';
            this.docente.fecha = '';
            this.docente.genero = '';
        }
    },
    created(){
        this.obtenerDocentes();
    },
    template:`
    <div id="appCiente">
    <div class="card text-white" id="carDocente">
        <div class="card-header bg-primary">
            Registro Docente
            <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carDocente" aria-label="Close"></button>
        </div>
        <div class="card-body text-dark">
            <form method="post" @submit.prevent="guardarDocente" @reset="nuevoDocente">
            <div class="row p-1">
               <div class="col-3 col-md-1">
                <label for="txtCodigoDocente">Codigo:</label>
               </div>
                <div class="col-3 col-md-3">
                <input required pattern="[0-9]{3}" title="Ingrese un Codigo"
                    v-model="docente.codigo" type="text" class="form-control" name="txtCodigoDocente"
                    id="txtCodigoDocente">
                </div>
             </div>

                <div class="row p-1">
                <div class="col-3 col-md-1">
                    <label for="txtNombreDocente">Nombre:</label>
                </div>
                <div class="col-9 col-md-3">
                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" v-model="docente.nombre" type="text"
                        class="form-control" name="txtNombreDocente" id="txtNombreDocente">
                </div>
            </div>

            <div class="row p-1">
                <div class="col-3 col-md-1">
                    <label for="txtDireccionDocente">Dirección:</label>
                </div>
                <div class="col-9 col-md-3">
                    <input required pattern="[A-Za-zÑñáéíóú., ]{3,75}" v-model="docente.direccion" type="text" 
                        class="form-control" name="txtDireccionDocente" id="txtDireccionDocente">
                </div>
            </div>

            <div class="row p-1">
                <div class="col-3 col-md-1">
                    <label for="txtMunicipioDocente">Municipio:</label>
                </div>
                <div class="col-9 col-md-3">
                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" v-model="docente.municipio"
                        type="text" class="form-control" name="txtMunicipioDocente"
                        id="txtMunicipioDocente">
                </div>
            </div>
            <!--Capa de ingreso de datos n5-->
            <div class="row p-1">
                <div class="col-3 col-md-1">
                    <label for="txtDepartamentoDocente">Departamento:</label>
                </div>
                <div class="col-9 col-md-3">
                    <select v-model="docente.departamento" required pattern="[A-Za-zÑñáéíóú., ]{3,75}"
                        type="text" class="form-control" name="txtDepartamentoDocente"
                        id="txtDepartamentoDocente">
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
                <label for="txtTelefonoDocente">Teléfono:</label>
            </div>
            <div class="col-9 col-md-3">
                <input v-model="docente.telefono" title="Ingrese un numero sin espacios ni guiones" pattern="[0-9]{4}-[0-9]{4}" type="text" class="form-control"
                    name="txtTelefonoDocente" id="txtTelefonoDocente">
            </div>
        </div>
        <!--Capa de ingreso de datos n4-->
        <div class="row p-1">
            <div class="col-3 col-md-1">
                <label for="txtFechaDocente">Fecha de nacimiento:</label>
            </div>
            <div class="col-9 col-md-3">
                <input v-model="docente.fecha" type="date" class="form-control" name="txtFechaDocente"
                    id="txtFechaDocente">
            </div>
        </div>
        <!--Capa de ingreso de datos n4-->
        <div class="row p-1">
            <div class="col-3 col-md-1">
                <label for="txtGeneroDocente">Genero:</label>
            </div>
            <div class="col-9 col-md-3">
                <select v-model="docente.genero" type="text" class="form-control"
                    name="txtGeneroDocente" id="txtGeneroDocente">
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>
            </div>
        </div>

                <div class="row p-1">
                    <div class="col col-md-5 text-center">
                        <div v-if="docente.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                            {{ docente.msg }}
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
    <div class="card text-white" id="carBuscarDocente">
        <div class="card-header bg-primary">
            Busqueda de Docentes
            <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarDocente" aria-label="Close"></button>
        </div>
        <div class="card-body">
            <table class="table table table-hover">
                <thead>
                    <tr>
                        <th colspan="6">
                            Buscar: <input @keyup="buscandoDocente" v-model="buscar" placeholder="Buscar aqui" class="form-control" type="text" >
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
                    <tr v-for="item in docentes" @click='modificarDocente( item )' :key="item.idDocente">
                        <td>{{item.codigo}}</td>
                        <td>{{item.nombre}}</td>
                        <td>{{item.direccion}}</td>
                        <td>{{item.telefono}}</td>
                        <td>{{item.departamento}}</td>
                        <td>{{item.fecha}}</td>
                        <td>
                            <button class="btn btn-danger" @click="eliminarDocente(item)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`
});