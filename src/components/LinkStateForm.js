import React from 'react'
import {Button} from 'antd';
import {SwapOutlined} from '@ant-design/icons';
import './scss/LinkStateForm.scss';

export default function LinkStateForm({handleEdit, entity}) {
    const {title, link} = entity;
    const editedEntity = {...entity, isActive:!entity.isActive}
    const changeButtonTitle = "Cambiar estado";
    return (
        <div className="entity-state-form">
            <h4 className="entity-state-form__content"><b>{ `Está seguro que desea cambiar el estado a ${title}?`}</b></h4>
            <p>{link}</p>
            <Button className="entity-state-form__button" type="primary" danger onClick={()=>handleEdit(editedEntity)}>
                <SwapOutlined/> {changeButtonTitle}
            </Button>
        </div>
    );
}
