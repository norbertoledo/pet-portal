import React, {useEffect, useState, useCallback} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { signupThunk, editUserThunk, deleteUserThunk, fetchUsersThunk, resetUserDataThunk } from '../redux/thunks/usersThunk';
import { Layout, notification } from 'antd';
import LoadingSpinner from '../components/LoadingSpinner';
import UsersList from '../components/UsersList';

export default function Users() {

    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {isLoading, userError, userData, usersData} = useSelector(state => state.users);
    const {statesData} = useSelector(state => state.states);

    const [states, setStates]=useState(statesData);
    const [users, setUsers]=useState([]);
    const [userResponse, setUserResponse]=useState(false);
    

    const setUsersLists = useCallback((users)=>{   
        const activeUsers = users.filter(user=>user.isActive);
        const inactiveUsers = users.filter(user=>!user.isActive);
        const refactorUsers = [activeUsers, inactiveUsers];
        setUsers(refactorUsers);
    },[]);

    
    const openNotificationError = useCallback(() => {    
        notification.error({
            message: userData.message  
        });
    },[userData]);
    
    const openNotificationSuccess = useCallback(() => {
        console.log("data",userData);
        notification.success({
            message: userData.message
        });
    },[userData]);
    
    // HANDLERS

    const handleSignup = (payload) => {
        console.log('[SIGNUP: handleSignup]->', payload);       
        dispatch( signupThunk(payload) );
    }

    const handleDelete = (payload) => {
        console.log('[DELETE: handleDelete]->', payload);       
        dispatch( deleteUserThunk(payload) );
    }

    const handleEdit = (payload) => {
        console.log('[EDIT: handleEdit]->', payload);       
        dispatch( editUserThunk(payload) );
    }


    useEffect(()=>{
        if(userError) {
            openNotificationError()
            setUserResponse(false);
        };
        if(!userError && userData.status === 200) {
            openNotificationSuccess();
            dispatch(fetchUsersThunk());
            setUserResponse(true);
            dispatch(resetUserDataThunk());
        };

    },[dispatch, userError, userData, openNotificationError, openNotificationSuccess]);



    useEffect(()=>{
        setStates(statesData.data);
    },[statesData]);
    

    useEffect(()=>{
        dispatch(fetchUsersThunk());
    },[dispatch]);

    useEffect(()=>{
        if(usersData.data.length>0){
            setUsersLists(usersData.data);
        };
    },[usersData, setUsersLists]);

    console.log("USERS IS LOADING: -> ", isLoading);
//console.log("STATES IS LOADING: -> ", statesIsLoading);


    return (

        <Layout className="users">
            <Content className="users__content">
            {
                !states.length>0 && !users.length>0 
                ? 
                isLoading && <div className="layout-spinner"><LoadingSpinner/></div>
                : 
                <UsersList
                    activeUsers={users[0]}
                    inactiveUsers={users[1]}
                    handleSignup={handleSignup}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    states={states}
                    userResponse={userResponse}
                    setUserResponse={setUserResponse}
                />

            }

            </Content>
        </Layout>

    )

}