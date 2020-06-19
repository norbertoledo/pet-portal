import React from 'react'
import {Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import './scss/StateDeleteForm.scss';

export default function StateDeleteForm({entity, handleDelete}) {
    const {name} = entity;
    const deleteButtonTitle = "Eliminar"
    return (
        <div className="entity-delete-form">
            <h4 className="entity-delete-form__content"><b>{ `Está seguro que desea eliminar ${name}?`}</b></h4>
            <Button className="entity-delete-form__button" type="primary" danger onClick={()=>handleDelete(entity)}>
                <DeleteOutlined/> {deleteButtonTitle}
            </Button>
        </div>
    )
}
