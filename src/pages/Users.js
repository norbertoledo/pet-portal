import React, {useEffect, useState, Suspense} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { signupThunk, editUserThunk, deleteUserThunk, fetchUsersThunk, resetUserDataThunk } from '../redux/thunks/usersThunk';
import { Layout, Tabs, notification } from 'antd';
import LoadingSpinner from '../components/LoadingSpinner';
import UsersList from '../components/UsersList';

export default function Users() {

    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {userError, userData, usersData} = useSelector(state => state.users);
    const {statesError, statesData} = useSelector(state => state.states);

    const [states, setStates]=useState([]);
    const [users, setUsers]=useState([]);
    const [userResponse, setUserResponse]=useState(false);
    

    const setUsersLists = (users)=>{   
        const activeUsers = users.filter(user=>user.isActive);
        const inactiveUsers = users.filter(user=>!user.isActive);
        const refactorUsers = [activeUsers, inactiveUsers];
        setUsers(refactorUsers);
    }

    
    const openNotificationError = () => {    
        notification.error({
            message: userData.message  
        });
    };
    
    const openNotificationSuccess = () => {
        console.log("data",userData);
        notification.success({
            message: userData.message
        });
    };
    
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

    },[userError, userData]);


    useEffect(()=>{
        setStates(statesData.data);
    },[statesData.data]);
    

    useEffect(()=>{
        dispatch(fetchUsersThunk());
    },[dispatch]);

    useEffect(()=>{
        setUsersLists(usersData.data);
    },[usersData.data]);


    return (

        <Layout className="users">
            <Content className="users__content">
            {
                !states.length>0 && users.length>0
                ? <div className="layout-spinner"><LoadingSpinner/></div>
                : <Suspense fallback={ <div><LoadingSpinner/></div> }></Suspense>
            }

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


            </Content>
        </Layout>

    )

}