import React, {useState, useEffect} from 'react';
import {Switch, List, Avatar, Button, Radio} from 'antd';
import { UserOutlined, CheckOutlined, EditOutlined, StopOutlined, DeleteOutlined, SwapOutlined } from '@ant-design/icons';
import NoImage from '../assets/images/users/no_image.jpg';
import Modal from '../components/Modal'
import SignupForm from './SignupForm';
import UserDeleteForm from './UserDeleteForm';
import UserStateForm from './UserStateForm';
import UserEditForm from './UserEditForm';


import './scss/UsersList.scss';
import ColumnGroup from 'antd/lib/table/ColumnGroup';


const UsersList = (props) => {
    const {inactiveUsers, activeUsers, handleSignup, handleEdit, handleDelete, states, userResponse, setUserResponse} = props;
    const [viewIsActiveUsers, setViewIsActiveUsers] = useState(true);
    
    const [filteredActiveUsers, setFilteredActiveUsers] = useState(activeUsers);
    const [filteredInactiveUsers, setFilteredInactiveUsers] = useState(inactiveUsers);

    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const roles=[
        {
            name: "Administrador",
            value: "admin"
        },
        {
            name: "Cliente",
            value: "customer"
        },
        {
            name: "Usuario",
            value: "user"
        },
    ];

    const handleCreateUser = () => {
        console.log("EDITAR");
        setModalTitle("Crear Usuario");
        setSelectedForm(<SignupForm handleSignup={handleSignup} states={states} roles={roles}/>);
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

    const resetSelectedData = () => {
        setIsModalVisible(false);
        setSelectedForm(null);
        setUserResponse(false);
    }
    const filterUsers = (e)=>{
        
        const dataSource = viewIsActiveUsers ? activeUsers : inactiveUsers;
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
                        }
                    }
                    );
                    console.log("selectedKey",selectedKey);
                    return selectedKey[0];
                })
        }
        console.log("filtered", filtered);
            //dataTo(filtered);
        viewIsActiveUsers ? setFilteredActiveUsers(filtered) : setFilteredInactiveUsers(filtered);
    
    }
    const getRole = (role)=>{
       const userRole = Object.keys(role).map(key=>{
            if(role[key]===true){ 
                const rol = roles.filter(item=>{
                    if(item.value===key){
                        return item.name
                    }
                })
                return rol[0].name;
            }
        });
        return userRole;
    }

    useEffect(()=>{
        if(userResponse){ resetSelectedData() };
    },[userResponse]);

    useEffect(()=>{
        setFilteredActiveUsers(activeUsers);
        setFilteredInactiveUsers(inactiveUsers);
    }, [activeUsers, inactiveUsers]);

    
    //console.log("userResponse: ",userResponse);
    console.log("filteredActiveUsers: ",filteredActiveUsers);
    console.log("filteredInactiveUsers: ",filteredInactiveUsers);
    console.log("activeUsers: ",activeUsers);
    


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
                <Radio.Group className="users-list__header__radio" defaultValue={"all"} onChange={e=>filterUsers(e)}>
                    <Radio.Button value="all">Todos</Radio.Button>
                    {
                        roles.map((item, index) => (
                            <Radio.Button
                                key={index}
                                value={item.value}
                                label={item.name}
                            >
                                {item.name}
                            </Radio.Button>
                        ))
                    }
                </Radio.Group>
                
                <Button className="users-list__header__button-create" type="primary" danger onClick={()=>handleCreateUser()}>
                <UserOutlined /> Crear usuario
                </Button>
            </div>
            <List
                className="users-list__list"
                itemLayout="horizontal"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 6,
                }}
                dataSource={viewIsActiveUsers ? filteredActiveUsers : filteredInactiveUsers}
                renderItem={ user => {
                    const {name, email, city, photoUrl, role} = user;
                    
                    const description = <p><b>[{getRole(role)}]</b> - {email} | {city}</p>
                    const buttons = viewIsActiveUsers ? activeActions(user) : inactiveActions(user);
                    return(
                        <List.Item
                        actions={buttons}
                        >
                            <List.Item.Meta
                                avatar = {<Avatar src={photoUrl ? photoUrl : NoImage}/>}
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


