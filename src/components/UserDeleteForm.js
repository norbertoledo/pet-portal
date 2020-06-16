import React from 'react'
import {Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import './scss/UserDeleteForm.scss';

export default function UserDeleteForm({user, handleDelete}) {
    
    const {name, email} = user;

    return (
        <div className="user-delete-form">
            <h4 className="user-delete-form__content"><b>{ `Está seguro que desea eliminar a ${name}?`}</b></h4>
            <p>{`( ${email} )`}</p>
            <Button className="user-delete-form__button" type="primary" danger onClick={()=>handleDelete(user)}>
                <DeleteOutlined/> Eliminar
            </Button>
        </div>
    )
}
