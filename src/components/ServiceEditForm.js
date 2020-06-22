import React, {useState, useEffect} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { ShopOutlined, PhoneOutlined, GlobalOutlined, CompassOutlined, EnvironmentOutlined, ColumnWidthOutlined, ColumnHeightOutlined, UnorderedListOutlined, CheckOutlined } from '@ant-design/icons';
import UploadAvatar from './UploadAvatar';
import { MIN_ROWS_TEXTAREA, MAX_ROWS_TEXTAREA } from '../utils/constants';
import './scss/ServiceEditForm.scss';

export default function ServiceEditForm({handleEdit, entity, categories, states}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState(entity);
    const submitButtonTitle = "Editar Lugar";
    const {name, description, address, phone, website, state, category, image, isActive, latlng:{lat,long}}=entity;

    const [avatar, setAvatar]=useState(null);
    
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

        // PHONE
        let ph = entityData.phone;
        ph = ph.replace(/\D/g,'');
        dataToSend = {...dataToSend, phone:ph };


        // AVATAR
        if(avatar.file){
            dataToSend = {...dataToSend, avatar};
        }

        // TO SEND
        console.log("dataToSend->", dataToSend);
        handleEdit(dataToSend);
    }

    useEffect(()=>{
        if(image.length>0){
            setAvatar({...avatar, preview:image});
        }
    },[image]);
   
    return (
        <div className="entity-edit-form">
        <UploadAvatar
            className=""
            avatar={avatar}
            setAvatar={setAvatar}
        /> 
        <Form
            name="entity_create"
            className="login-form"
            initialValues={{ 
                name: name,
                description: description,
                address: address,
                phone: phone,
                website: website,
                state: state,
                latitud: lat,
                longitud: long,
                category: category,
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
                prefix={<ShopOutlined className="site-form-item-icon" />} 
                placeholder="Nombre" 
                onChange={ e=>setEntityData( {...entityData, name:e.target.value} )  }
                />
            </Form.Item>


            <Form.Item
                name="description"
                rules={[
                {
                    required: false,
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
                name="address"
                rules={[
                {
                    required: true,
                    message: 'Ingrese una Dirección!',
                },
                ]}
            >
                <Input 
                prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                placeholder="Dirección" 
                onChange={ e=>setEntityData( {...entityData, address:e.target.value} )  }
                />
            </Form.Item>

            <Form.Item
                name="phone"
                rules={[
                {
                    required: true,
                    message: 'Ingrese un teléfono!',
                },
                ]}
            >
                <Input 
                prefix={<PhoneOutlined className="site-form-item-icon" />} 
                placeholder="Teléfono" 
                onChange={ e=>setEntityData( {...entityData, phone:e.target.value} )  }
                />
            </Form.Item>

            <Form.Item
                name="website"
                rules={[
                {
                    required: true,
                    message: 'Ingrese un link!',
                },
                ]}
            >
                <Input 
                prefix={<GlobalOutlined className="site-form-item-icon" />} 
                placeholder="Website" 
                onChange={ e=>setEntityData( {...entityData, website:e.target.value} )  }
                />
            </Form.Item>

            <Form.Item
                name="state"
                rules={[
                {
                    required: true,
                    message: 'Ingrese región!',
                },
                ]}
            >
                <Select               
                    showSearch
                    allowClear
                    placeholder={
                        <React.Fragment>
                        <CompassOutlined  />
                        &nbsp; Región
                        </React.Fragment>
                    }
                    onChange={ e=>setEntityData( {...entityData, state:e} )  }
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                {
                    states.map(item=>(
                        <Option 
                        key={item.id} 
                        value={item.name}>
                            {item.name}
                        </Option>
                    ))
                }
                </Select>                        
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
                name="category"
                rules={[
                {
                    required: true,
                    message: 'Ingrese categoría!',
                },
                ]}
            >
                <Select               
                    showSearch
                    allowClear
                    placeholder={
                        <React.Fragment>
                        <UnorderedListOutlined  />
                        &nbsp; Categoría
                        </React.Fragment>
                    }
                    onChange={ e=>setEntityData( {...entityData, category:e} )  }
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                {
                    categories.map(item=>(
                        <Option 
                        key={item.id} 
                        value={item.name}>
                            {item.name}
                        </Option>
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
