import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { HighlightOutlined, LinkOutlined, CheckOutlined } from '@ant-design/icons';
import './scss/LinkEditForm.scss';

export default function LinkEditForm({handleEdit, entity}) {

    const { Option } = Select;
    const [entityData, setEntityData]=useState(entity);
    const submitButtonTitle = "Editar link";
    const {title, description, link, isActive}=entity;
    
    const handleForm = (value)=>{
        console.log("ENVIO EDIT: ->", entityData);
        handleEdit(entityData);
    }
   

    return (
        <div className="entity-edit-form">

            <Form
                name="entity_create"
                className="login-form"

                onFinish={handleForm}
                >
                <Form.Item
                    name="title"
                    rules={[
                    {
                        required: true,
                        message: 'Ingrese un Titulo!',
                    },
                    ]}
                >
                    <Input 
                    prefix={<HighlightOutlined className="site-form-item-icon" />} 
                    placeholder="Titulo"
                    defaultValue={title}
                    onChange={ e=>setEntityData( {...entityData, title:e.target.value} )  }
                    />
                </Form.Item>


                
                <Form.Item
                    name="description"
                    rules={[
                    {
                        required: true,
                        message: 'Ingrese una descripción!',
                    },
                    ]}
                >
                    
                    <Input.Group>
                        <Input.TextArea
                        defaultValue={description}
                        onChange={ e=>setEntityData( {...entityData, description:e.target.value} )  }
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Input.Group>
                </Form.Item>


                <Form.Item
                    name="link"
                    rules={[
                    {
                        required: true,
                        message: 'Ingrese un link!',
                    },
                    ]}
                >
                    <Input 
                    prefix={<LinkOutlined className="site-form-item-icon" />} 
                    placeholder="Link"
                    defaultValue={link}
                    onChange={ e=>setEntityData( {...entityData, link:e.target.value} )  }
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
                        defaultValue={isActive}
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
