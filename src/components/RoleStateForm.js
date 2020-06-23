import React from 'react'
import {Button} from 'antd';
import {SwapOutlined} from '@ant-design/icons';
import './scss/RoleStateForm.scss';

export default function RoleStateForm({handleEdit, entity}) {
    const {role} = entity;
    const editedEntity = {...entity, isActive:!entity.isActive}
    const changeButtonTitle = "Cambiar estado";
    const alertMessage = "ATENCIÓN! Todos los usuarios con este rol pasarán a estar inactivos!" 
    return (
        <div className="entity-state-form">
            <h4 className="entity-state-form__content"><b>{ `Está seguro que desea cambiar el estado a ${role}?`}</b></h4>
            <p>{alertMessage}</p>
            <Button className="entity-state-form__button" type="primary" danger onClick={()=>handleEdit(editedEntity)}>
                <SwapOutlined/> {changeButtonTitle}
            </Button>
        </div>
    );
}
