import React, {useState, useEffect} from 'react';
import services from '../services';


export default function Links() {

    const [links, setLinks] = useState([]);
    const {auth} = services;
    
    useEffect(()=>{
        /*
        // Si no está autenticado, return
        if(!auth.currentUser) {
            return;
        }
        // Si el usuario se encuentra autenticado, pido el token
        const token = await auth.currentUser.getIdToken();
        // console.log(token);
        // Hago el llamado al endpoint y envio en las cabeceras el token de autenticacion
        const result = await fetch(`/api/posts/${id}/like`, {
            headers: {
                authorization: token
            }
        });
        // El resultado de la consulta lo parseo como texto
        const text = await result.text();
        console.log(text);
        */

        const getLinks = async()=>{
            // Si no está autenticado, return
        if(!auth.currentUser) {
            return;
        }
        // Si el usuario se encuentra autenticado, pido el token
        const token = await auth.currentUser.getIdToken();
         console.log("TOKEN->",token);
        // Hago el llamado al endpoint y envio en las cabeceras el token de autenticacion
            const res = await fetch('/api/links', {
                headers: {
                    authorization: token
                }});
            const data = await res.json()
            setLinks(data);
            console.log("res->",data);
        }
        getLinks();

    },[]);



    return (
        <div>
            {
                links.map( (l,index ) => (
                    <div key={index}>
                        <h2>{l.nombre}</h2>
                        <p>{l.link}</p>
                    </div>
                ))
            }
        </div>
    )
}
