const functions = require('firebase-functions');
const admin = require ('firebase-admin');
const express = require('express');

/*
const express = require('express');
const app = express();
app.get("/links", (req, res)=>{
    res.send("HOLA");
});
*/
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
const auth = admin.auth();


    // MIDDLEWARE
    const app = express();
    app.use( async (req, res, next)=>{

        const token = req.headers.authorization;

        try {

            const { uid, email } = await auth.verifyIdToken( token );

            const snap = await db.collection('usuarios').doc(uid).get();
            const user = snap.data();

            console.log('[Middleware]->user', user);

            // Mutar el objeto de request para agregar en el user las propiedades de uid e email
            Object.assign( req, {
                user: {
                    ...user,
                    uid,
                    email,
                }
            })
            res.status(200);
            return next();

        } catch (e){
            console.log(e);
            res.status(403).send('Error al autorizar usuario');
            return null;
        }

    });

    // LINKS
    app.get("/api/links", async (req, res)=>{
        
        try{
            const snap = await db.collection('links').get();
            const links = snap.docs.map( item => item.data() );
            res.send(links);
        
        } catch(e){
            res.send('Error. No se pudieron obtener los links', e);
        }

    });
    

exports.api = functions.https.onRequest( app );



