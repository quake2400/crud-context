import React from 'react';
import Swal from 'sweetalert2';
import backEnd from '../config/backend';

const TablaEmpresa = ({empresa, index, ActualizarEmpresa, ActualizaIMG, deleteEmpresa}) => {
    const {nombre, url, creado, _id, nombre_imagen} = empresa;

    const editarEmpresa = async (id, editEmpresa) =>{

        const { value: formValues } = await Swal.fire({
            title: 'Editar Empresa',
            html:
              'Nombre: <input id="swal-input1" class="swal2-input" value="'+editEmpresa.nombre+'">' +
              'URL: <input id="swal-input2" class="swal2-input" value="'+editEmpresa.url+'">'+
              'Descripcion: <input id="swal-input3" class="swal2-input" value="'+editEmpresa.descripcion+'">',
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
              ]
            }
        });

        if (typeof formValues === "undefined"){
            return;
        }

        const objetoEmpresa = {
            nombre: formValues[0],
            url: formValues[1],
            descripcion: formValues[2]
        }
        
        ActualizarEmpresa(id, objetoEmpresa);
    }

    const editarImagen = async(id) => {

        const { value: file } = await Swal.fire({
            title: 'Editar Imagen',
            imageUrl: backEnd.baseURL+`${nombre_imagen}`,
            imageWidth: 400,
            imageHeight: 200,
            input: 'file',
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your profile picture'
            }
        });

        ActualizaIMG(id, file);
    }

    const eliminarEmpresa = async(id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Una empresa que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                deleteEmpresa(id);
            }
        });
    }
    
    return(
        <>
            <tr>
                <th scope="row">{( index + 1 )}</th>
                <td>{nombre}</td>
                <td>{url}</td>
                <td>{creado}</td>
                <td>
                    <button 
                        type="button" 
                        className="btn btn-warning mx-2"
                        onClick={()=> editarEmpresa(_id, empresa)}
                    >Editar</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary mx-2"
                        onClick={()=> editarImagen(_id)}
                    > Editar Imagen</button>
                    <button 
                        type="button" 
                        className="btn btn-danger mx-2"
                        onClick={()=> eliminarEmpresa(_id)}
                        >Eliminar</button>
                </td>
            </tr>
        </>
    );
}
 
export default TablaEmpresa;