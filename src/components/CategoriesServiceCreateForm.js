import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { ShopOutlined, BgColorsOutlined, CheckOutlined } from '@ant-design/icons';
import ColorPicker from '../utils/ColorPicker';
import UploadAvatar from './UploadAvatar';
import './scss/CategoriesServiceCreateForm.scss';
import NoImage from '../assets/images/users/no_image.jpg';

export default function CategoriesServiceCreateForm({handleCreate}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState({});
    
    const [avatar, setAvatar]=useState(null);
    const [color, setColor] = useState("white");
    const [showColorPicker, setShowColorPicker] = useState(false);

    const submitButtonTitle = "Crear categoría de servicios";

    const handleForm = async (value)=>{


        let dataToSend = {...entityData, color};
        if(avatar!==null){
            dataToSend = {...dataToSend, avatar};
        }else{

            const url = NoImage;
            //let newBlob = await fetch(url).then(r => r.blob());

            let newFile = await fetch(url)
            .then(
                r => r.blob()
            )
            .then(
                blobFile => new File([blobFile], "categoriesserviceimage", { type: "image/png" })
            )

            const noavatar = {
                //file: newBlob
                file: newFile
            }
            dataToSend = {...dataToSend, avatar:noavatar};
        }
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


                {showColorPicker && (
                    <ColorPicker
                        color={color}
                        setColor={setColor}
                        showColorPicker={showColorPicker}
                        setShowColorPicker={setShowColorPicker}
                        isBackgroundColor={true}
                    />
                )}

                <div
                style={
                    {
                        display:"flex",
                        alignItems:"center",
                        paddingLeft:"15px",
                        height:"35px", 
                        marginBottom:"25px",
                        backgroundColor:color, 
                        color: color!=="white" ? "white" : "#b0b0b0", 
                        borderRadius: "2px",
                        border: "0.3px solid #e0e0e0"
                    }
                    
                }
                onClick={()=>setShowColorPicker( showColorPicker => !showColorPicker)}
                >
                    <BgColorsOutlined className="site-form-item-icon" />
                    &nbsp; {color!=="white" ? color : "Selecciona un Color"}
                </div>
                


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
