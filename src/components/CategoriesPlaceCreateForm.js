import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { EnvironmentOutlined, BgColorsOutlined, CheckOutlined } from '@ant-design/icons';
import ColorPicker from '../utils/ColorPicker';
import './scss/CategoriesPlaceCreateForm.scss';


export default function CategoriesPlaceCreateForm({handleCreate}) {
    const { Option } = Select;
    const [entityData, setEntityData]=useState({});
    
    const [color, setColor] = useState("white");
    const [showColorPicker, setShowColorPicker] = useState(false);

    const submitButtonTitle = "Crear Categoría de Lugar";

    const handleForm = (value)=>{
        const dataToSend = {...entityData, color};
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
                prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
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

    )
}
/*
{showColorPicker && (

                <div
                    style={{
                        position: 'relative',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:color,
                        padding:'10px',
                        borderRadius:'2px',
                        margin:'0 1px',
                        }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            width:'100%',
                            height:'100%',marginTop: '10px',      
                        }}
                        onClick={()=>setShowColorPicker( showColorPicker => !showColorPicker)}
                    />
                    
                    <SketchPicker 
                        color={color}
                        onChange={ updatedColor => setColor( updatedColor.hex) }
                    />
                    
                </div>

            )}
*/