Vue.component('component-matriculas',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            matriculas: [],
            matricula:{
                idMatricula : '',
                codigo : '',
                nombre : '',
            }
        }
    },
    methods:{
        guardarMatricula(){
            this.listarMatriculas();
            if(this.accion==='nuevo'){
                this.matricula.idMatricula = new Date().getTime().toString(16);
                this.matriculas.push( JSON.parse( JSON.stringify(this.matricula) ) );
            }else if(this.accion==='modificar'){
                let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                this.matriculas[index] = JSON.parse( JSON.stringify(this.matricula) );
            }else if(this.accion==='eliminar'){
                let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                this.matriculas.splice(index,1);
            }
            localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
            this.nuevoMatricula();
        },
        eliminarMatricula(matricula){
            if( confirm(`Esta seguro de eliminar a ${matricula.nombre}?`) ){
                this.accion='eliminar';
                this.matricula=matricula;
                this.guardarMatricula();
            }
        },
        nuevoMatricula(){
            this.accion = 'nuevo';
            this.matricula.idMatricula = '';
            this.matricula.codigo = '';
            this.matricula.nombre = '';
        },
        modificarMatricula(matricula){
            this.accion = 'modificar';
            this.matricula = matricula;
        },
        listarMatriculas(){
            this.matriculas = JSON.parse( localStorage.getItem('matriculas') || "[]" )
                .filter(matricula=>matricula.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE MATRICULA</div>
                    <div class="card-body">
                        <form id="frmMatricula" @reset.prevent="nuevoMatricula" v-on:submit.prevent="guardarMatricula">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoMatricula">CODIGO:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de matricula de 3 digitos"
                                            v-model="matricula.codigo" type="text" class="form-control" name="txtCodigoMatricula" id="txtCodigoMatricula">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtNombreMatricula">NOMBRE:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="matricula.nombre" type="text" class="form-control" name="txtNombreMatricula" id="txtNombreMatricula">
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
                    <div class="card-header">LISTADO DE MATRICULAS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listarMatriculas()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>CODIGO</th>
                                    <th colspan="2">NOMBRE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)" >
                                    <td>{{ matricula.codigo }}</td>
                                    <td>{{ matricula.nombre }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarMatricula(matricula)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});