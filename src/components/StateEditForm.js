import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { CompassOutlined, ColumnWidthOutlined, ColumnHeightOutlined, CheckOutlined } from '@ant-design/icons';
import './scss/StateEditForm.scss';


export default function StateEditForm({handleEdit, entity}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState(entity);
    const submitButtonTitle = "Editar Región";
    const {name, latlng:{lat, long}, isActive}=entity;
    
    const handleForm = (value)=>{

        let dataToSend = {};
        
        // LATLNG
        let latlng;
        if(entityData.lat){
            latlng = { ...latlng, lat: Number.parseFloat(entityData.lat) }
            delete entityData.lat;
        }else{
            latlng = { ...latlng, lat: lat }
        }
        if(entityData.long){
            latlng = { ...latlng, long: Number.parseFloat(entityData.long)}        
            delete entityData.long;
        }else{
            latlng = { ...latlng, long: long }
        }
        dataToSend = {...entityData, latlng};

        console.log("dataToSend", dataToSend);
        handleEdit(dataToSend);
    }
   

    return (
        <div className="entity-edit-form">

            <Form
                name="entity_create"
                className="login-form"
                initialValues={{ 
                name: name,
                latitud: lat,
                longitud: long,
                isActive: isActive
                }}
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
                    //defaultValue={name}
                    onChange={ e=>setEntityData( {...entityData, name:e.target.value} )  }
                    />
                </Form.Item>


                
                <Form.Item
                    name="latitud"
                    rules={[
                    {
                        required: true,
                        message: 'Ingrese una Latitud!',
                    },
                    ]}
                >
                    <Input 
                    prefix={<ColumnWidthOutlined className="site-form-item-icon" />} 
                    placeholder="Latitud"
                    //defaultValue={lat}
                    onChange={ e=>setEntityData( {...entityData, lat:e.target.value} )  }
                    />
                </Form.Item>


                <Form.Item
                    name="longitud"
                    rules={[
                    {
                        required: true,
                        message: 'Ingrese una Longitud!',
                    },
                    ]}
                >
                    <Input 
                    prefix={<ColumnHeightOutlined className="site-form-item-icon" />} 
                    placeholder="Longitud"
                    //defaultValue={long}
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
