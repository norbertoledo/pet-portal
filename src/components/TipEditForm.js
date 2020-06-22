import React, {useState, useEffect} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { MessageOutlined, HighlightOutlined, CheckOutlined } from '@ant-design/icons';
import UploadAvatar from './UploadAvatar';
import { MIN_ROWS_TEXTAREA, MAX_ROWS_TEXTAREA } from '../utils/constants';
import moment from 'moment';
import { DatePicker } from 'antd';
import './scss/TipEditForm.scss';

export default function TipEditForm({handleEdit, entity}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState(entity);
    const submitButtonTitle = "Editar Lugar";
    const {title, caption, description, postedAt, image, isActive}=entity;

    const [avatar, setAvatar]=useState(null);
    
    const handleForm = (value)=>{
        let dataToSend = {...entityData};

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
        <div className="entity-create-form">
            <UploadAvatar
                className=""
                avatar={avatar}
                setAvatar={setAvatar}
            /> 
            <Form
                name="entity_create"
                className="login-form"
                initialValues={{ 
                title: title,
                caption: caption,
                description: description,
                postedAt: moment(postedAt, 'YYYY-MM-DD h:mm:ss'),
                isActive: isActive
                }}
                onFinish={handleForm}
                >
                <Form.Item
                    name="title"
                    rules={[
                    {
                        required: true,
                        message: 'Ingrese un Título!',
                    },
                    ]}
                >
                    <Input 
                    prefix={<MessageOutlined className="site-form-item-icon" />} 
                    placeholder="Título" 
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
                    name="postedAt"
                    rules={[
                    {
                        required: true,
                        message: 'Ingrese una Fecha de Publicación!',
                    },
                    ]}
                >
                    <DatePicker
                    placeholder={"Fecha de Publicación"}
                    format="YYYY-MM-DD HH:mm:ss"
                    //disabledDate={disabledDate}
                    //disabledTime={disabledDateTime}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    onChange={ (date, dateString)=>setEntityData( {...entityData, postedAt:dateString} )  }
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
        </div>
        )
}
