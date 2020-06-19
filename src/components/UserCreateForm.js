import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { MailOutlined, UserOutlined, LockOutlined, CheckOutlined, CompassOutlined } from '@ant-design/icons';
import UploadAvatar from './UploadAvatar';
import './scss/UserCreateForm.scss';

export default function UserCreateForm({handleSignup, states, roles}) {
    
    const { Option } = Select;
    const [userData, setUserData]=useState({});
    const [avatar, setAvatar]=useState(null);

    const handleForm = (value)=>{

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

        
        if(avatar!==null){
            console.log("dataToSend", {...userData, avatar});
            handleSignup({...userData, avatar});
        }else{
            console.log("dataToSend", userData);
            handleSignup(userData);
        }
        
    }

    return (
        <div className="user-signup-form">
            <UploadAvatar
                className=""
                avatar={avatar}
                setAvatar={setAvatar}
            />                  
        <Form
                    name="normal_login"
                    className="login-form"

                    onFinish={handleForm}
                    >
                    <Form.Item
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Ingrese un Email!',
                        },
                        ]}
                    >
                        <Input 
                        prefix={<MailOutlined className="site-form-item-icon" />} 
                        placeholder="Email" 
                        onChange={ e=>setUserData( {...userData, email:e.target.value} )  }
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Ingrese un password!',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        onChange={ e=>setUserData( {...userData, password:e.target.value} )  }
                        />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: 'Ingrese un nombre!',
                        },
                        ]}
                    >
                        <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Nombre" 
                        onChange={ e=>setUserData( {...userData, name:e.target.value} )  }
                        />
                    </Form.Item>

                    
                    
                    <Form.Item
                        name="role"
                        rules={[
                        {
                            required: true,
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
                            required: true,
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
                            required: true,
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
                        Crear usuario
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
}
