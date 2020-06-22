import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { EnvironmentOutlined, HighlightOutlined, ColumnWidthOutlined, ColumnHeightOutlined, UnorderedListOutlined, CheckOutlined } from '@ant-design/icons';
import UploadAvatar from './UploadAvatar';
import NoImage from '../assets/images/users/no_image.jpg';
import './scss/PlaceCreateForm.scss';
import { MIN_ROWS_TEXTAREA, MAX_ROWS_TEXTAREA } from '../utils/constants';

export default function PlaceCreateForm({handleCreate, categories}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState({});
    const [avatar, setAvatar]=useState(null);
    const submitButtonTitle = "Crear Lugar";

    const handleForm = async (value)=>{

        let dataToSend = {};

        // LATLNG
        const latlng = {
            lat: Number.parseFloat(entityData.lat),
            long: Number.parseFloat(entityData.long)
        }        
        delete entityData.lat;
        delete entityData.long;
        dataToSend = {...entityData, latlng};
        
        // COLOR
        const category = categories.find(cat=>cat.name === entityData.category);
        dataToSend = {...dataToSend, color:category.color};
        
        // AVATAR
        if(avatar!==null){
            dataToSend = {...dataToSend, avatar};
        }else{
            const url = NoImage;
            let newFile = await fetch(url)
            .then(
                r => r.blob()
            )
            .then(
                blobFile => new File([blobFile], "imagetosave", { type: "image/png" })
            )
            const noavatar = {
                file: newFile
            }
            dataToSend = {...dataToSend, avatar:noavatar};
        }

        // TO SEND
        console.log("dataToSend->", dataToSend);
        handleCreate(dataToSend);
    }

    return (
    <div className="entity-create-form">
        <UploadAvatar
            className=""
            avatar={avatar}
            setAvatar={setAvatar}
        /> 
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
                onChange={ e=>setEntityData( {...entityData, caption:e.target.value} )  }
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
