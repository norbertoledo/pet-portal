import React from 'react'
import {Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import './scss/RoleDeleteForm.scss';
export default function RoleDeleteForm({entity, handleDelete}) {
    const {role} = entity;
    const deleteButtonTitle = "Eliminar";
    const alertMessage = "ATENCIÓN! Todos los usuarios con este rol pasarán a tener el rol de 'user'"; 
    return (
        <div className="entity-delete-form">
            <h4 className="entity-delete-form__content"><b>{ `Está seguro que desea eliminar ${role}?`}</b></h4>
            <p>{alertMessage}</p>
            <Button className="entity-delete-form__button" type="primary" danger onClick={()=>handleDelete(entity)}>
                <DeleteOutlined/> {deleteButtonTitle}
            </Button>
        </div>
    )
}
