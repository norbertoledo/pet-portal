import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { ControlOutlined, CheckOutlined } from '@ant-design/icons';
import './scss/RoleCreateForm.scss';

const RoleCreateForm = ({handleCreate}) => {
    const { Option } = Select;
    const [entityData, setEntityData]=useState({});
    const submitButtonTitle = "Crear rol";

    const handleForm = (value)=>{
        console.log("dataToSend", entityData);
        handleCreate(entityData);       
    }

    return (

        <Form
            name="entity_create"
            className="login-form"

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
    )
}

export default RoleCreateForm;
