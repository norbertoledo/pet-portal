import React, {useState, useCallback, useEffect} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { MailOutlined, UserOutlined, LockOutlined, CheckOutlined, CompassOutlined, CameraOutlined } from '@ant-design/icons';
import UploadAvatar from './UploadAvatar'
import './scss/UserEditForm.scss';

export default function UserEditForm({handleEdit, user, states, roles}) {
    const { Option } = Select;
    const {email, name, city, role, isActive, photoUrl}=user;
    const [userData, setUserData]=useState(user);
    const [avatar, setAvatar]=useState(null);

    console.log(avatar);

    const getRole = ()=>{
        const selectedKey = Object.keys(role).filter(
            (key)=>{
                return role[key]===true
            }
        );
        return selectedKey[0].toString();
    }
    
    const handleForm = (value)=>{
        
        console.log("value",value);
        //console.log("userData.role: "+userData.role)
        if(value.role!==undefined){
            let newUserRole = {
                admin: false,
                customer: false,
                user: false
            };

            switch (value.role) {
                case "admin":
                    newUserRole = {
                        ...newUserRole,
                        admin: true
                    }
                    break;
                case "customer":
                    newUserRole = {
                        ...newUserRole,
                        customer: true
                    }
                    break;
                case "user":
                    newUserRole = {
                        ...newUserRole,
                        user: true
                    }
                    break;
            
                default:
                    break;
            }
            userData.role = newUserRole;
        }

        //console.log("userData", {...userData, avatar});
        if(avatar.preview!==photoUrl){
            handleEdit({...userData, avatar});
        }else{
            handleEdit(userData);
        }
    }

    useEffect(()=>{
       
        if(photoUrl.length>0){
            setAvatar({...avatar, preview:user.photoUrl});
        }
        
    },[user.photoUrl])
    

    return (
        <div className="user-edit-form">
            <UploadAvatar
                className=""
                avatar={avatar}
                setAvatar={setAvatar}
            />
            <Form
                    name="edit_form"
                    className="edit-form"
                    onFinish={handleForm}
                    >
                    <Form.Item
                        name="email"
                        rules={[
                        {
                            required: false,
                            message: 'Ingrese un Email!',
                        },
                        ]}
                    >
                        <Input 
                        disabled={true}
                        prefix={<MailOutlined className="site-form-item-icon" />} 
                        placeholder="Email"
                        defaultValue={email}
                        />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[
                        {
                            required: false,
                            message: 'Ingrese un nombre!',
                        },
                        ]}
                    >
                        <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Nombre" 
                        defaultValue={name}
                        value={name}
                        onChange={ e=>setUserData( {...userData, name:e.target.value} )  }
                        />
                    </Form.Item>

                    
                    
                    <Form.Item
                        name="role"
                        rules={[
                        {
                            required: false,
                            message: 'Ingrese un rol!',
                        },
                        ]}
                    >

                        <Select
                            showSearch
                            allowClear
                            placeholder={
                                <React.Fragment>
                                <CheckOutlined  />
                                &nbsp; Rol
                                </React.Fragment>
                            }
                            
                            defaultValue={getRole}

                            optionFilterProp="children"
                            onChange={ e=>setUserData( {...userData, role:e} )  }
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                            
                            roles.map((item, index) => (
                                <Select.Option
                                    key={index}
                                    value={item.value}
                                    label={
                                        <React.Fragment>
                                            <CompassOutlined  />
                                                {item.name}
                                        </React.Fragment>
                                    }
                                >
                                    {item.name}
                                </Select.Option>
                            ))
                        }
                        </Select>
                        
                    </Form.Item>

                    


                    <Form.Item
                        name="region"
                        rules={[
                        {
                            required: false,
                            message: 'Ingrese una region!',
                        },
                        ]}
                    >


                        
                        <Select
                            
                            showSearch
                            allowClear
                            placeholder={
                                <React.Fragment>
                                <CompassOutlined  />
                                &nbsp; Seleccione una región
                                </React.Fragment>
                            }
                            defaultValue={city}
                            onChange={ e=>setUserData( {...userData, city:e} )  }
                            optionFilterProp="children"
                            //style={{ width: '75%' }}
                            //onChange={onChange}
                            //onFocus={onFocus}
                            //onBlur={onBlur}
                            //onSearch={onSearch}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                            
                                states.map((item, index) => (
                                    <Select.Option
                                        key={index}
                                        value={item.name}
                                        label={
                                            <React.Fragment>
                                                <CompassOutlined  />
                                                    {item.name}
                                            </React.Fragment>
                                        }
                                    >
                                        {item.name}
                                    </Select.Option>
                                ))
                            }
                            
                            

                        </Select>
                        

                        
                    </Form.Item>

                    <Form.Item
                        name="isActive"
                        rules={[
                        {
                            required: false,
                            message: 'Ingrese estado de actividad!',
                        },
                        ]}
                    >

                        <Select
                            
                            showSearch
                            allowClear
                            placeholder={
                                <React.Fragment>
                                <CheckOutlined  />
                                &nbsp; Es activo?
                                </React.Fragment>
                            }
                            defaultValue={isActive}
                            onChange={ e=>setUserData( {...userData, isActive:e} )  }
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value={true}>Si</Option>
                            <Option value={false}>No</Option>
                            
                        
                        </Select>
                        
                    </Form.Item>
                   

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                        >
                        Editar usuario
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
}
