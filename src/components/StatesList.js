import React, {useState, useEffect, useCallback} from 'react';
import {Switch, List, Button} from 'antd';
import { CompassOutlined, CheckOutlined, EditOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../components/Modal'
import StateCreateForm from './StateCreateForm';
import StateEditForm from './StateEditForm';
import StateDeleteForm from './StateDeleteForm';
import StateStateForm from './StateStateForm';

export default function StatesList(props) {
    
    const {activeItems, inactiveItems, handleCreate, handleEdit, handleDelete, dispatchResponse, setDispatchResponse} = props;


    const [viewIsActiveItems, setViewIsActiveItems] = useState(true);
 
    const [filteredActiveItems, setFilteredActiveItems] = useState([]);
    const [filteredInactiveItems, setFilteredInactiveItems] = useState([]);

    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const activeItemsTitle = "Regiones Activas";
    const inactiveItemsTitle = "Regiones Inactivas";
    const createButtonTitle = "Crear Región"


    const handleCreateEntity = () => {
        console.log("CREAR");
        setModalTitle("Crear Región");
        setSelectedForm(<StateCreateForm handleCreate={handleCreate}/>);
        setIsModalVisible(true);
    }

    const handleEditEntity = (entity) => {
        console.log("EDITAR");
        setModalTitle("Editar Región");
        setSelectedForm(<StateEditForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleStateEntity = (entity) => {
        console.log("CAMBIAR ESTADO")
        setModalTitle("Cambiar estado");
        setSelectedForm(<StateStateForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleDeleteEntity = (entity) => {
        console.log("ELIMINAR");
        setModalTitle("Eliminar Región")
        setSelectedForm(<StateDeleteForm entity={entity} handleDelete={handleDelete}/>);
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
                <CompassOutlined /> {createButtonTitle}
                </Button>
            </div>
            <List
                className="items-list__list"
                itemLayout="horizontal"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 6,
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
