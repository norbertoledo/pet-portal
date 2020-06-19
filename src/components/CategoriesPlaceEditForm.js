import React, {useState} from 'react'
import { Form, Input, Select, Button} from 'antd';
import { EnvironmentOutlined, BgColorsOutlined, CheckOutlined } from '@ant-design/icons';
import ColorPicker from '../utils/ColorPicker';
import './scss/CategoriesPlaceEditForm.scss';


const CategoriesPlaceEditForm = ({handleEdit, entity}) => {
    const { Option } = Select;
    const [entityData, setEntityData]=useState(entity);
    const submitButtonTitle = "Editar Categoría";
    const {name, color:entityColor, isActive}=entity;

    const [color, setColor] = useState(entityColor);
    const [showColorPicker, setShowColorPicker] = useState(false);
    
    const handleForm = (value)=>{
        const dataToSend = {...entityData, color};
        console.log("dataToSend", dataToSend);
        handleEdit(dataToSend);
    }
   
    return (
        <div className="entity-edit-form">

        <Form
            name="entity_edit"
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
                defaultValue={name} 
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
                    defaultValue={isActive}
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

export default CategoriesPlaceEditForm;
