import React, {useState, useEffect} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { EnvironmentOutlined, HighlightOutlined, ColumnWidthOutlined, ColumnHeightOutlined, UnorderedListOutlined, CheckOutlined } from '@ant-design/icons';
import UploadAvatar from './UploadAvatar';
import { MIN_ROWS_TEXTAREA, MAX_ROWS_TEXTAREA } from '../utils/constants';
import './scss/PlaceEditForm.scss';

export default function PlaceEditForm({handleEdit, entity, categories}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState(entity);
    const submitButtonTitle = "Editar Lugar";
    const {title, caption, description, category, image, isActive, latlng:{lat,long}}=entity;

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
        
        // COLOR
        const category = categories.find(cat=>cat.name === entityData.category);
        dataToSend = {...dataToSend, color:category.color};

        // AVATAR
        dataToSend = {...dataToSend, avatar};

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
            name="entity_edit"
            className="login-form"
            initialValues={{ 
                title: title,
                caption: caption,
                description: description,
                latitud: lat,
                longitud: long,
                category: category,
                isActive: isActive
                }}
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
                prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                placeholder="Titulo"
                onChange={ e=>setEntityData( {...entityData, title:e.target.value} )  }
                />
            </Form.Item>

            <Form.Item
                name="caption"
                rules={[
                {
                    required: true,
                    message: 'Ingrese un Resumen!',
                },
                ]}
            >
                <Input 
                prefix={<HighlightOutlined className="site-form-item-icon" />} 
                placeholder="Resumen"
                //defaultValue={caption}
                onChange={ e=>setEntityData( {...entityData, caption:e.target.value} )  }
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
                //defaultValue={description}
                onChange={ e=>setEntityData( {...entityData, description:e.target.value} )  }
                autoSize={{ minRows: MIN_ROWS_TEXTAREA, maxRows: MAX_ROWS_TEXTAREA }}
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
                //defaultValue={lat}
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
                //defaultValue={long}
                onChange={ e=>setEntityData( {...entityData, long:e.target.value} )  } 

                />  
            </Form.Item>

            
            <Form.Item
                name="category"
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
                        <UnorderedListOutlined  />
                        &nbsp; Categoría
                        </React.Fragment>
                    }
                    //defaultValue={category}
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
