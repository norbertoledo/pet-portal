import React, {useEffect, useState} from 'react';
//import {useSelector} from 'react-redux';
import services from '../services';

export default function Users() {
    

    return(
        <h1>Users Pageeeeeeeeeeeeeeeeeeeeeeeeeee</h1>
    )

    /*
    const [users, setUsers] = useState([]);
    const {db} = services;

    useEffect(()=>{

        db.collection('usuarios').onSnapshot(handleSnapshot);


    },[]);

    const handleSnapshot = (snapshot) => {

        const usuarios = snapshot.docs.map( (doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            }
        });
    console.log(usuarios);
    }
    */
}