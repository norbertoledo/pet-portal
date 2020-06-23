import React, {useState, useEffect, useCallback} from 'react';
import {Switch, List, Avatar, Button, Select} from 'antd';
import { UserOutlined, CheckOutlined, EditOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import NoImage from '../assets/images/users/no_image.jpg';
import Modal from '../components/Modal'
import UserCreateForm from './UserCreateForm';
import UserDeleteForm from './UserDeleteForm';
import UserStateForm from './UserStateForm';
import UserEditForm from './UserEditForm';
import { MAX_ITEMS_PAGE } from '../utils/constants';

import './scss/UsersList.scss';


const UsersList = (props) => {
    const { Option } = Select;

    const {activeUsers, inactiveUsers, handleSignup, handleEdit, handleDelete, states, roles, userResponse, setUserResponse} = props;
    
    const [viewIsActiveUsers, setViewIsActiveUsers] = useState(true);
    const [filteredActiveUsers, setFilteredActiveUsers] = useState([]);
    const [filteredInactiveUsers, setFilteredInactiveUsers] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");


    const handleCreateUser = () => {
        console.log("EDITAR");
        setModalTitle("Crear Usuario");
        setSelectedForm(<UserCreateForm handleSignup={handleSignup} states={states} roles={roles}/>);
        setIsModalVisible(true);
    }

    const handleEditUser = (user) => {
        console.log("EDITAR");
        setModalTitle("Editar usuario");
        setSelectedForm(<UserEditForm user={user} handleEdit={handleEdit} states={states} roles={roles}/>);
        setIsModalVisible(true);
    }

    const handleStateUser = (user) => {
        console.log("CAMBIAR ESTADO")
        setModalTitle("Cambiar estado");
        setSelectedForm(<UserStateForm user={user} handleEdit={handleEdit}/>);
        setIsModalVisible(true);
    }

    const handleDeleteUser = (user) => {
        console.log("ELIMINAR");
        setModalTitle("Eliminar usuario")
        setSelectedForm(<UserDeleteForm user={user} handleDelete={handleDelete}/>);
        setIsModalVisible(true);
    }

    const activeActions = (user)=>{
        const buttons = [
            <Button type="primary" onClick={()=>handleEditUser(user)}>
                <EditOutlined />
                </Button>,
                <Button type="primary" danger onClick={()=>handleStateUser(user)}>
                <StopOutlined />
                </Button>,
                <Button type="primary" danger onClick={()=>handleDeleteUser(user)}>
                <DeleteOutlined />
                </Button>
        ];

        return buttons;
    }

    const inactiveActions = (user)=>{
        const buttons = [
            <Button type="primary" onClick={()=>handleEditUser(user)}>
            <EditOutlined />
            </Button>,
            <Button type="primary" onClick={()=>handleStateUser(user)}>
            <CheckOutlined />
            </Button>,
            <Button type="primary" danger onClick={()=>handleDeleteUser(user)}>
            <DeleteOutlined />
            </Button>
        ];

        return buttons;
    }

    const resetSelectedData = useCallback(() => {
        setIsModalVisible(false);
        setSelectedForm(null);
        setUserResponse(false);
    },[setUserResponse]);


    const filterItems = (e)=>{
        
        const dataSource = viewIsActiveUsers ? activeUsers : inactiveUsers;
        const selectedValue = e;
        let filtered = [];
        
        if(selectedValue==="all"){
            filtered = dataSource;
        }else{

            filtered = dataSource.filter(
            item=>{
                
                const selectedKey = Object.keys(item.role).filter(
                    (key)=>{
                        if(item.role[key]===true && key === selectedValue){
                            return key;
                        }else{
                            return null;
                        }
                    }
                    );
                    
                    return selectedKey[0];
                })
        }
            
        viewIsActiveUsers ? setFilteredActiveUsers(filtered) : setFilteredInactiveUsers(filtered);
    
    };

    const getRole = (role)=>{
       const userRole = Object.keys(role).map(key=>{
            if(role[key]===true){ 
                const rol = roles.filter(item=>{
                    if(item.value===key){
                        return item.name
                    }else{
                        return null;
                    }
                })
                return rol[0].name;
            }else{
                return null;
            }
        });
        return userRole;
    }

    useEffect(()=>{
        if(userResponse){ 
            resetSelectedData() 
        };
    },[userResponse, resetSelectedData]);


    useEffect(()=>{
        setFilteredActiveUsers(activeUsers);
        setFilteredInactiveUsers(inactiveUsers);
    }, [activeUsers, inactiveUsers]);


    return (
        <div className="users-list">
            <div className="users-list__header">
                <Switch
                    className="users-list__header__switch"
                    defaultChecked
                    onChange={ () => setViewIsActiveUsers(!viewIsActiveUsers) }
                />
                <h4 className="users-list__header__title">
                    {viewIsActiveUsers ? "Usuarios Activos" : "Usuarios Inactivos"}
                </h4>
                <div className="users-list__header__filter">
                    <p className="users-list__header__filter__title">Filtar por:</p>
                    <Select
                        className="users-list__header__filter__select"
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
                        roles.map((item, index)=>(
                            <Option 
                            key={index} 
                            value={item.value}>
                                {item.name}
                            </Option>
                        ))
                    }
                    </Select> 
                </div>

                
                <Button className="users-list__header__button-create" type="primary" danger onClick={()=>handleCreateUser()}>
                <UserOutlined /> Crear usuario
                </Button>
            </div>
            <List
                className="users-list__list"
                itemLayout="horizontal"
                pagination={{
                    onChange: page => {
                        //console.log(page);
                    },
                    pageSize: MAX_ITEMS_PAGE,
                }}
                dataSource={viewIsActiveUsers ? filteredActiveUsers : filteredInactiveUsers}
                renderItem={ user => {
                    const {name, email, city, photoUrl, thumbUrl, role} = user;
                    
                    const description = <p><b>[{getRole(role)}]</b> - {email} | {city}</p>
                    const buttons = viewIsActiveUsers ? activeActions(user) : inactiveActions(user);
                    return(
                        <List.Item
                        actions={buttons}
                        >
                            <List.Item.Meta
                                //avatar = {<Avatar src={thumbUrl ? thumbUrl : NoImage}/>}
                                title = {name}
                                description = {description}
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

export default UsersList;


