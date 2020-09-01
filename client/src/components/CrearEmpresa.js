import React, {useState, useContext} from 'react';
import empresaContext from '../context/empresa/empresaContext';
import alertaContext from '../context/alerta/alertaContext';
import Swal from 'sweetalert2';

const CrearEmpresa = () => {
    const EmpresaContext = useContext(empresaContext);
    const {subirEmpresa} = EmpresaContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;

    const [empresa, guardarEmpresa] = useState({
        nombre:'',
        descripcion: '',
        url: ''
    });

    const [archivo, guardarFile] = useState({
        selectedFile: null
    });

    const {nombre, descripcion, url } = empresa;

    const {selectedFile} = archivo;

    const onChangeEmpresa = e =>{
        guardarEmpresa({
            ...empresa,
            [e.target.name] : e.target.value
        });
    }

    const onChangeFile = (e) =>{
        guardarFile({
            ...archivo,
            selectedFile: e.target.files[0]
        }) ;
    }

    const enviarFormulario = async (e) =>{
        e.preventDefault();

        const objetoEmpresa = {
            nombre,
            descripcion,
            url
        }

        const subir = await subirEmpresa(selectedFile,objetoEmpresa);

        if(!subir){
            mostrarAlerta('Error al crear la empresa', 'alert-danger');
            return;
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha creado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            mostrarAlerta('La empresa se ha creado con exito', 'alert-success');
        }

        //Limpiar campos
        guardarEmpresa({
            nombre:'',
            descripcion: '',
            url: ''
        });

        guardarFile({
            selectedFile: null
        }) ;
    }

    return (
        <>
        { alerta ? ( <div className={`alert ${alerta.categoria}`} role="alert"> {alerta.msg} </div> )  : null }
        <h1 className="mt-3 mb-4 text-center">Crear Empresa</h1>
        <div className="card justify-content-center">
            <div className="card-body">

                <div className="row justify-content-center">
                <form
                    onSubmit={enviarFormulario}
                    encType="multipart/form-data"
                    name="fileinfo"
                >
                    <div className="form-group justify-content-center">
                        <label htmlFor="staticNombre">
                            Nombre
                        </label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="staticNombre"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeEmpresa} />
                        </div>
                    </div>

                    <div className="form-group justify-content-center">
                        <label htmlFor="staticURL">
                            URL
                        </label>
                        <div className="col-sm-10">
                            <input 
                            type="text" 
                            className="form-control" 
                            id="staticURL" 
                            name="url"
                            value={url}
                            onChange={onChangeEmpresa}/>
                        </div>
                    </div>

                    <div className="form-group justify-content-center">
                        <label htmlFor="staticArchivo">
                            Archivo
                        </label>
                        <div className="col-sm-10">
                            <input type="file"
                            className="form-control" 
                            id="staticArchivo" 
                            name="imagen"
                            onChange={onChangeFile}/>
                        </div>
                    </div>

                    <div className="form-group justify-content-center">
                        <label htmlFor="staticDescripcion">
                        Descripción
                        </label>
                        <div className="col-sm-10">
                            <textarea 
                                className="form-control" 
                                id="staticDescripcion" 
                                rows="3"
                                name="descripcion"
                                value={descripcion}
                                onChange={onChangeEmpresa}></textarea>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default CrearEmpresa;