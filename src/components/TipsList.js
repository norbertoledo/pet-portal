import React, {useState, useEffect, useCallback} from 'react';
import {Switch, List, Button} from 'antd';
import { MessageOutlined, CheckOutlined, EditOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../components/Modal'
import TipCreateForm from './TipCreateForm';
import TipEditForm from './TipEditForm';
import TipStateForm from './TipStateForm';
import TipDeleteForm from './TipDeleteForm';
import { MAX_ITEMS_PAGE } from '../utils/constants';
import './scss/TipsList.scss';

export default function TipsList(props) {
    const {activeItems, inactiveItems, handleCreate, handleEdit, handleDelete, dispatchResponse, setDispatchResponse} = props;

    const [viewIsActiveItems, setViewIsActiveItems] = useState(true);
    const [filteredActiveItems, setFilteredActiveItems] = useState([]);
    const [filteredInactiveItems, setFilteredInactiveItems] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const activeItemsTitle = "Tips Activos";
    const inactiveItemsTitle = "Tips Inactivos";
    const createButtonTitle = "Crear tip"


    const handleCreateEntity = () => {
        console.log("CREAR");
        setModalTitle("Crear tip");
        setSelectedForm(<TipCreateForm handleCreate={handleCreate}/>);
        setIsModalVisible(true);
    }

    const handleEditEntity = (entity) => {
        console.log("EDITAR");
        setModalTitle("Editar tip");
        setSelectedForm(<TipEditForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleStateEntity = (entity) => {
        console.log("CAMBIAR ESTADO")
        setModalTitle("Cambiar estado");
        setSelectedForm(<TipStateForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleDeleteEntity = (entity) => {
        console.log("ELIMINAR");
        setModalTitle("Eliminar tip")
        setSelectedForm(<TipDeleteForm entity={entity} handleDelete={handleDelete}/>);
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
        <div className="tips-list">
            <div className="tips-list__header">
                <Switch
                    className="tips-list__header__switch"
                    defaultChecked
                    onChange={ () => setViewIsActiveItems(!viewIsActiveItems) }
                />
                <h4 className="tips-list__header__title">
                    {viewIsActiveItems ? activeItemsTitle : inactiveItemsTitle}
                </h4>
        
                <Button className="tips-list__header__button-create" type="primary" danger onClick={()=>handleCreateEntity()}>
                <MessageOutlined /> {createButtonTitle}
                </Button>
            </div>
            <List
                className="tips-list__list"
                itemLayout="horizontal"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: MAX_ITEMS_PAGE,
                }}
                dataSource={viewIsActiveItems ? filteredActiveItems : filteredInactiveItems}
                renderItem={ entity => {
                    const {title, caption} = entity;
                    const buttons = viewIsActiveItems ? activeActions(entity) : inactiveActions(entity);
                    return(
                        <List.Item
                        actions={buttons}
                        >
                            <List.Item.Meta
                                title = {title}
                                description = {caption}
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
