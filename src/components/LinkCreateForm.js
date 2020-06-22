import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { HighlightOutlined, LinkOutlined, CheckOutlined } from '@ant-design/icons';
import { MIN_ROWS_TEXTAREA, MAX_ROWS_TEXTAREA } from '../utils/constants';
import './scss/LinkCreateForm.scss';

export default function LinkCreateForm({handleCreate}) {

    const { Option } = Select;
    const [entityData, setEntityData]=useState({});
    const submitButtonTitle = "Crear link";

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

                <Input.TextArea
                placeholder={"Descripción"}
                onChange={ e=>setEntityData( {...entityData, description:e.target.value} )  }
                autoSize={{ minRows: MIN_ROWS_TEXTAREA, maxRows: MAX_ROWS_TEXTAREA }}
                />

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
