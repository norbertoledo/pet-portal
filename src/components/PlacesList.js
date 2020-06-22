import React, {useState, useEffect, useCallback} from 'react';
import {Switch, List, Select, Button} from 'antd';
import { EnvironmentOutlined, CheckOutlined, EditOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../components/Modal'
import PlaceCreateForm from './PlaceCreateForm';
import PlaceEditForm from './PlaceEditForm';
import PlaceStateForm from './PlaceStateForm';
import PlaceDeleteForm from './PlaceDeleteForm';
import { MAX_ITEMS_PAGE } from '../utils/constants';
import './scss/PlacesList.scss';

export default function PlacesList(props) {
    const { Option } = Select;
    const {activeItems, inactiveItems, categories, handleCreate, handleEdit, handleDelete, dispatchResponse, setDispatchResponse} = props;

    const [viewIsActiveItems, setViewIsActiveItems] = useState(true);
    const [filteredActiveItems, setFilteredActiveItems] = useState([]);
    const [filteredInactiveItems, setFilteredInactiveItems] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const activeItemsTitle = "Lugares Activos";
    const inactiveItemsTitle = "Lugares Inactivos";
    const createButtonTitle = "Crear lugar"


    const handleCreateEntity = () => {
        console.log("CREAR");
        setModalTitle("Crear lugar");
        setSelectedForm(<PlaceCreateForm handleCreate={handleCreate} categories={categories}/>);
        setIsModalVisible(true);
    }

    const handleEditEntity = (entity) => {
        console.log("EDITAR");
        setModalTitle("Editar lugar");
        setSelectedForm(<PlaceEditForm entity={entity} handleEdit={handleEdit} categories={categories}/>);
        setIsModalVisible(true);
    }

    const handleStateEntity = (entity) => {
        console.log("CAMBIAR ESTADO")
        setModalTitle("Cambiar estado");
        setSelectedForm(<PlaceStateForm entity={entity} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleDeleteEntity = (entity) => {
        console.log("ELIMINAR");
        setModalTitle("Eliminar lugar")
        setSelectedForm(<PlaceDeleteForm entity={entity} handleDelete={handleDelete}/>);
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
        <div className="places-list">
            <div className="places-list__header">
                <Switch
                    className="places-list__header__switch"
                    defaultChecked
                    onChange={ () => setViewIsActiveItems(!viewIsActiveItems) }
                />
                <h4 className="places-list__header__title">
                    {viewIsActiveItems ? activeItemsTitle : inactiveItemsTitle}
                </h4>
                <div className="places-list__header__filter">
                    <p className="places-list__header__filter__title">Filtar por:</p>
                    <Select
                        className="places-list__header__filter__select"
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


                <Button className="items-list__header__button-create" type="primary" danger onClick={()=>handleCreateEntity()}>
                <EnvironmentOutlined /> {createButtonTitle}
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
                    const {title} = entity;
                    const {category} = entity;
                    const buttons = viewIsActiveItems ? activeActions(entity) : inactiveActions(entity);
                    return(
                        <List.Item
                        actions={buttons}
                        >
                            <List.Item.Meta
                                title = {title}
                                description = {category}
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
