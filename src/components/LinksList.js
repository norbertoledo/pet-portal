import React, {useState, useEffect, useCallback} from 'react';
import {Switch, List, Button} from 'antd';
import { LinkOutlined, CheckOutlined, EditOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../components/Modal'
import LinkCreateForm from './LinkCreateForm';
import LinkDeleteForm from './LinkDeleteForm';
import LinkStateForm from './LinkStateForm';
import LinkEditForm from './LinkEditForm';

import './scss/LinksList.scss';

export default function LinksList(props) {

    const {activeItems, inactiveItems, handleCreate, handleEdit, handleDelete, dispatchResponse, setDispatchResponse} = props;


    const [viewIsActiveItems, setViewIsActiveItems] = useState(true);
 
    const [filteredActiveItems, setFilteredActiveItems] = useState([]);
    const [filteredInactiveItems, setFilteredInactiveItems] = useState([]);

    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const activeItemsTitle = "Links Activos";
    const inactiveItemsTitle = "Links Inactivos";
    const createButtonTitle = "Crear Link"


    const handleCreateEntity = () => {
        console.log("CREAR");
        setModalTitle("Crear Link");
        setSelectedForm(<LinkCreateForm handleCreate={handleCreate}/>);
        setIsModalVisible(true);
    }

    const handleEditEntity = (entity) => {
        console.log("EDITAR");
        setModalTitle("Editar Link");
        setSelectedForm(<LinkEditForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleStateEntity = (entity) => {
        console.log("CAMBIAR ESTADO")
        setModalTitle("Cambiar estado");
        setSelectedForm(<LinkStateForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleDeleteEntity = (entity) => {
        console.log("ELIMINAR");
        setModalTitle("Eliminar Link")
        setSelectedForm(<LinkDeleteForm entity={entity} handleDelete={handleDelete}/>);
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

/*
    const filterItems = (e)=>{
        
        const dataSource = viewIsActiveItems ? activeItems : inactiveItems;
        let filtered = [];
        console.log("e.target.value", e.target.value);
        if(e.target.value==="all"){
            filtered = dataSource;
        }else{

            filtered = dataSource.filter(
            item=>{
                
                const selectedKey = Object.keys(item.role).filter(
                    (key)=>{
                        if(item.role[key]===true && key === e.target.value){
                            return key;
                        }else{
                            return null;
                        }
                    }
                    );
                    console.log("selectedKey",selectedKey);
                    return selectedKey[0];
                })
        }
        console.log("filtered", filtered);
            //dataTo(filtered);
        viewIsActiveItems ? setFilteredActiveItems(filtered) : setFilteredInactiveItems(filtered);
    
    };
*/

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
                <LinkOutlined /> {createButtonTitle}
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
                    const {title} = entity;
                    
                    const buttons = viewIsActiveItems ? activeActions(entity) : inactiveActions(entity);
                    return(
                        <List.Item
                        actions={buttons}
                        >
                            <List.Item.Meta
                                title = {title}
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
