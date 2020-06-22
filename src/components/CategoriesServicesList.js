import React, {useState, useEffect, useCallback} from 'react';
import {Switch, List, Button} from 'antd';
import { ShopOutlined, CheckOutlined, EditOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../components/Modal'
import CategoriesServiceCreateForm from './CategoriesServiceCreateForm';
import CategoriesServiceEditForm from './CategoriesServiceEditForm';
import CategoriesServiceStateForm from './CategoriesServiceStateForm';
import CategoriesServiceDeleteForm from './CategoriesServiceDeleteForm';
import { MAX_ITEMS_PAGE } from '../utils/constants';

export default function CategoriesServicesList(props) {
    const {activeItems, inactiveItems, handleCreate, handleEdit, handleDelete, dispatchResponse, setDispatchResponse} = props;


    const [viewIsActiveItems, setViewIsActiveItems] = useState(true);
 
    const [filteredActiveItems, setFilteredActiveItems] = useState([]);
    const [filteredInactiveItems, setFilteredInactiveItems] = useState([]);

    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const activeItemsTitle = "Servicios Activos";
    const inactiveItemsTitle = "Servicios Inactivos";
    const createButtonTitle = "Crear categoría"


    const handleCreateEntity = () => {
        console.log("CREAR");
        setModalTitle("Crear categoría");
        setSelectedForm(<CategoriesServiceCreateForm handleCreate={handleCreate}/>);
        setIsModalVisible(true);
    }

    const handleEditEntity = (entity) => {
        console.log("EDITAR");
        setModalTitle("Editar categoría");
        setSelectedForm(<CategoriesServiceEditForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleStateEntity = (entity) => {
        console.log("CAMBIAR ESTADO")
        setModalTitle("Cambiar estado");
        setSelectedForm(<CategoriesServiceStateForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleDeleteEntity = (entity) => {
        console.log("ELIMINAR");
        setModalTitle("Eliminar categoría")
        setSelectedForm(<CategoriesServiceDeleteForm entity={entity} handleDelete={handleDelete}/>);
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
        <div className="items-list">
            <div className="items-list__header">
                <Switch
                    className="items-list__header__switch"
                    defaultChecked
                    onChange={ () => setViewIsActiveItems(!viewIsActiveItems) }
                />
                <h4 className="items-list__header__title">
                    {viewIsActiveItems ? activeItemsTitle : inactiveItemsTitle}
                </h4>

                <Button className="items-list__header__button-create" type="primary" danger onClick={()=>handleCreateEntity()}>
                <ShopOutlined /> {createButtonTitle}
                </Button>
            </div>
            <List
                className="items-list__list"
                itemLayout="horizontal"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: MAX_ITEMS_PAGE,
                }}
                dataSource={viewIsActiveItems ? filteredActiveItems : filteredInactiveItems}
                renderItem={ entity => {
                    const {name} = entity;
                    
                    const buttons = viewIsActiveItems ? activeActions(entity) : inactiveActions(entity);
                    return(
                        <List.Item
                        actions={buttons}
                        >
                            <List.Item.Meta
                                title = {name}
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
