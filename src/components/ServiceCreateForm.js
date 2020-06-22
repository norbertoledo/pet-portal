import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { ShopOutlined, PhoneOutlined, GlobalOutlined, CompassOutlined, EnvironmentOutlined, ColumnWidthOutlined, ColumnHeightOutlined, UnorderedListOutlined, CheckOutlined } from '@ant-design/icons';
import UploadAvatar from './UploadAvatar';
import NoImage from '../assets/images/users/no_image.jpg';
import { MIN_ROWS_TEXTAREA, MAX_ROWS_TEXTAREA } from '../utils/constants';
import './scss/ServiceCreateForm.scss';

export default function ServiceCreateForm({handleCreate, categories, states}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState({});
    const [avatar, setAvatar]=useState(null);
    const submitButtonTitle = "Crear Servicio";

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
        
        // PHONE
        let ph = entityData.phone;
        ph = ph.replace(/\D/g,'');
        
        dataToSend = {...dataToSend, phone:ph };

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
