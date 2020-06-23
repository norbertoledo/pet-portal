import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { ControlOutlined, CheckOutlined } from '@ant-design/icons';
import './scss/RoleEditForm.scss';

export default function RoleEditForm({handleEdit, entity}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState(entity);
    const submitButtonTitle = "Editar rol";
    const {role, alias, isActive}=entity;
    
    const handleForm = (value)=>{
        console.log("ENVIO EDIT: ->", entityData);
        handleEdit(entityData);
    }
   

    return (
        <div className="entity-edit-form">

            <Form
                name="entity_create"
                className="login-form"
                initialValues={{ 
                    role: role,
                    alias:alias,
                    isActive: isActive
                }}
                onFinish={handleForm}
                >
                <Form.Item
                    name="role"
                    rules={[
                    {
                        required: true,
                        message: 'Ingrese un Rol!',
                    },
                    ]}
                >
                    <Input 
                    prefix={<ControlOutlined className="site-form-item-icon" />} 
                    placeholder="Rol"
                    //defaultValue={title}
                    onChange={ e=>setEntityData( {...entityData, role:e.target.value} )  }
                    />
                </Form.Item>

                <Form.Item
                name="alias"
                rules={[
                {
                    required: true,
                    message: 'Ingrese un Alias!',
                },
                ]}
            >
                <Input 
                prefix={<ControlOutlined className="site-form-item-icon" />} 
                placeholder="Alias" 
                onChange={ e=>setEntityData( {...entityData, alias:e.target.value} )  }
                />
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
                        //defaultValue={isActive}
                        onChange={ e=>setEntityData( {...entityData, isActive:e} )  }
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
                    {submitButtonTitle}
                    </Button>
                </Form.Item>

            </Form>

        </div>
    )
}
