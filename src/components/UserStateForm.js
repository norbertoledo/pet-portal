import React from 'react'
import {Button} from 'antd';
import {SwapOutlined} from '@ant-design/icons';

const UserStateForm = ({user, handleEdit}) => {
    const {name, email} = user;
    const editedUser = {...user, isActive:!user.isActive}
    return (
        <div className="user-delete-form">
            <h4 className="user-delete-form__content"><b>{ `Está seguro que desea cambiar el estado a ${name}?`}</b></h4>
            <p>{`( ${email} )`}</p>
            <Button className="user-delete-form__button" type="primary" danger onClick={()=>handleEdit(editedUser)}>
                <SwapOutlined/> Cambiar estado
            </Button>
        </div>
    );
}

export default UserStateForm;
