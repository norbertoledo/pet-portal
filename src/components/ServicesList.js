import React, {useState, useEffect, useCallback} from 'react';
import {Switch, List, Select, Button} from 'antd';
import { ShopOutlined, CheckOutlined, EditOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../components/Modal'
import ServiceCreateForm from './ServiceCreateForm';
import ServiceEditForm from './ServiceEditForm';
import ServiceStateForm from './ServiceStateForm';
import ServiceDeleteForm from './ServiceDeleteForm';
import { MAX_ITEMS_PAGE } from '../utils/constants';
import './scss/ServicesList.scss';

export default function ServicesList(props) {
    const { Option } = Select;
    const {activeItems, inactiveItems, categories, states, handleCreate, handleEdit, handleDelete, dispatchResponse, setDispatchResponse} = props;

    const [viewIsActiveItems, setViewIsActiveItems] = useState(true);
    const [filteredActiveItems, setFilteredActiveItems] = useState([]);
    const [filteredInactiveItems, setFilteredInactiveItems] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const activeItemsTitle = "Servicios Activos";
    const inactiveItemsTitle = "Servicios Inactivos";
    const createButtonTitle = "Crear servicio"


    const handleCreateEntity = () => {
        console.log("CREAR");
        setModalTitle("Crear servicio");
        setSelectedForm(<ServiceCreateForm handleCreate={handleCreate} categories={categories} states={states}/>);
        setIsModalVisible(true);
    }

    const handleEditEntity = (entity) => {
        console.log("EDITAR");
        setModalTitle("Editar servicio");
        setSelectedForm(<ServiceEditForm entity={entity} handleEdit={handleEdit} categories={categories} states={states}/>);
        setIsModalVisible(true);
    }

    const handleStateEntity = (entity) => {
        console.log("CAMBIAR ESTADO")
        setModalTitle("Cambiar estado");
        setSelectedForm(<ServiceStateForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleDeleteEntity = (entity) => {
        console.log("ELIMINAR");
        setModalTitle("Eliminar servicio")
        setSelectedForm(<ServiceDeleteForm entity={entity} handleDelete={handleDelete}/>);
        setIsModalVisible(true);
    }

    const activeActions = (entity)=>{
        const buttons = [
            <Button type="primary" onClick={()=>handleEditEntity(entity)}>
                <EditOutlined />
                </Button>,
                <Button type="primary" danger onClick={()=>handleStateEntity(entity)}>
                <StopOutlined />
                </Button>,
                <Button type="primary" danger onClick={()=>handleDeleteEntity(entity)}>
                <DeleteOutlined />
                </Button>
        ];

        return buttons;
    }

    const inactiveActions = (entity)=>{
        const buttons = [
            <Button type="primary" onClick={()=>handleEditEntity(entity)}>
            <EditOutlined />
            </Button>,
            <Button type="primary" onClick={()=>handleStateEntity(entity)}>
            <CheckOutlined />
            </Button>,
            <Button type="primary" danger onClick={()=>handleDeleteEntity(entity)}>
            <DeleteOutlined />
            </Button>
        ];

        return buttons;
    }

    const resetSelectedData = useCallback(() => {
        setIsModalVisible(false);
        setSelectedForm(null);
        setDispatchResponse(false);
    },[setDispatchResponse]);

    const filterItems = (e)=>{
        
        const dataSource = viewIsActiveItems ? activeItems : inactiveItems;
        const selectedValue = e; 
        let filtered = [];
        
        if(selectedValue === "all"){
            filtered = dataSource;
        }else{
            filtered = dataSource.filter(item=>(item.category === selectedValue))
        }
        console.log("filtered", filtered);
        viewIsActiveItems ? setFilteredActiveItems(filtered) : setFilteredInactiveItems(filtered);
    
    };

    useEffect(()=>{
        if(dispatchResponse){ 
            resetSelectedData() 
        };
    },[dispatchResponse, resetSelectedData]);


    useEffect(()=>{
        setFilteredActiveItems(activeItems);
        setFilteredInactiveItems(inactiveItems);
    }, [activeItems, inactiveItems]);


    return (
        <div className="services-list">
            <div className="services-list__header">
                <Switch
                    className="services-list__header__switch"
                    defaultChecked
                    onChange={ () => setViewIsActiveItems(!viewIsActiveItems) }
                />
                <h4 className="services-list__header__title">
                    {viewIsActiveItems ? activeItemsTitle : inactiveItemsTitle}
                </h4>
                <div className="services-list__header__filter">
                    <p className="services-list__header__filter__title">Filtar por:</p>
                    <Select
                        className="services-list__header__filter__select"
                        showSearch
                        defaultValue={"all"}
                        onChange={ e=>filterItems( e )  }
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value={"all"}>Todos</Option>
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
                </div>


                <Button className="services-list__header__button-create" type="primary" danger onClick={()=>handleCreateEntity()}>
                <ShopOutlined /> {createButtonTitle}
                </Button>
            </div>
            <List
                className="services-list__list"
                itemLayout="horizontal"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: MAX_ITEMS_PAGE,
                }}
                dataSource={viewIsActiveItems ? filteredActiveItems : filteredInactiveItems}
                renderItem={ entity => {
                    const {name, category, state} = entity;
                    const buttons = viewIsActiveItems ? activeActions(entity) : inactiveActions(entity);
                    return(
                        <List.Item
                        actions={buttons}
                        >
                            <List.Item.Meta
                                title = {name}
                                description = {<p>{category} - {state}</p>}
                            />
                        </List.Item>
                    )
                }}
            />
            <Modal
                title={modalTitle}
                isVisible={isModalVisible}
                setIsVisible={()=>resetSelectedData()}
            >
                {selectedForm}

            </Modal>

        </div>
    );
}
