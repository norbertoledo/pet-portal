import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { CompassOutlined, ColumnWidthOutlined, ColumnHeightOutlined, CheckOutlined } from '@ant-design/icons';
import './scss/StateCreateForm.scss';

const StateCreateForm = ({handleCreate}) => {
    const { Option } = Select;
    const [entityData, setEntityData]=useState({});
    const submitButtonTitle = "Crear Región";

    const handleForm = (value)=>{

        const latlng = {
            lat: Number.parseFloat(entityData.lat),
            long: Number.parseFloat(entityData.long)
        }
        
        delete entityData.lat;
        delete entityData.long;
        const dataToSend = {...entityData, latlng};
        console.log("dataToSend", dataToSend);

        handleCreate(dataToSend);       
    }

    return (

        <Form
            name="entity_create"
            className="login-form"

            onFinish={handleForm}
            >
            <Form.Item
                name="name"
                rules={[
                {
                    required: true,
                    message: 'Ingrese un Nombre!',
                },
                ]}
            >
                <Input 
                prefix={<CompassOutlined className="site-form-item-icon" />} 
                placeholder="Nombre" 
                onChange={ e=>setEntityData( {...entityData, name:e.target.value} )  }
                />
            </Form.Item>


            
            <Form.Item
                name="latitud"
                rules={[
                {
                    required: true,
                    message: 'Ingrese una latitud!',
                },
                ]}
            >
            <Input 
                prefix={<ColumnWidthOutlined className="site-form-item-icon" />} 
                placeholder="Latitud" 
                onChange={ e=>setEntityData( {...entityData, lat:e.target.value}  )  } 

                />  
            </Form.Item>


            <Form.Item
                name="longitud"
                rules={[
                {
                    required: true,
                    message: 'Ingrese una longitud!',
                },
                ]}
            >
            <Input
                prefix={<ColumnHeightOutlined className="site-form-item-icon" />} 
                placeholder="Longitud" 
                onChange={ e=>setEntityData( {...entityData, long:e.target.value} )  } 

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

export default StateCreateForm;
