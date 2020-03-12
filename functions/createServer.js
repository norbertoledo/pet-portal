/*
const express = require('express');
const admin = require ('firebase-admin');



admin.initializeApp();
// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
// });


const db = admin.firestore();
const auth = admin.auth();

exports.createServer = () => {
    const app = express();

    // Middleware de autenticacion

    app.use( async (req, res, next)=>{
        const token = req.headers.authorization;

        try {

            const { uid, email } = await auth.verifyIdToken( token );

            const snap = await db.collection('users').doc(uid).get();
            const user = snap.data();

            console.log('[Middleware]->user', user);

            return next();

        } catch (e){
            console.log(e);
            res.status(403).send('Error al autorizar usuario');
        }


    });

    app.get("/links", async (req, res)=>{

        try{
            const snap = await db.collection('links').get();
        const links = snap.docs.map( item => item.data() );
        res.send(links);
        
        } catch(e){
            res.send('Error. No se pudieron obtener los links', e);
        }

    });

    return app;
}
*/