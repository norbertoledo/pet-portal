const functions = require('firebase-functions');
const admin = require ('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const { uuid } = require('uuidv4');


/** MULTIPART BUSBOY */
/**
 * Parses a 'multipart/form-data' upload request
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

const Busboy = require('busboy');



admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: "pet-portal.appspot.com"
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const petPortalBucket = storage.bucket();


    const app = express();
    
    // MIDDLEWARE
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use( async (req, res, next)=>{


        if(req.path === '/states' && req.headers.authorization === 'onlygetstateswithoutauth'){
            return next();
        }
        const token = req.headers.authorization;
        console.log('[Middleware]->token', token);
        try {

            const { uid, email } = await auth.verifyIdToken( token );
            
            console.log('[Middleware]->uid', uid);

            // Mutar el objeto de request para agregar las propiedades de uid e email
            Object.assign( req, {
                    uid,
                    email,
            })
            res.status(200);
            //console.log('[Middleware]->uid', req);
            return next();

        } catch (e){
            console.log(e);
            res.status(403).send('Error al autorizar usuario');
            return null;
        }
        

    });


    // DELETE USER FIREBASE AUTH
    app.post("/api/deleteuser", async(req, res)=>{
        
        try{
            const {emailtodelete} = req.body.data;
                        
            const userRecord = await auth.getUserByEmail(emailtodelete)
            const response = userRecord.toJSON();               
                     
            try{
                await auth.deleteUser(response.uid)
                res.status(200).send({message: 'Usuario borrado exitosamente'});
    
            }catch(e) {
                res.status(400).send({message: 'Error al borrar usuario'});
                console.log('Error deleting user:', e.message);
            }
            

        }catch(e){
            console.log('Error Obtener usuario:', e.message);
            res.status(400);
        }

    });


    // CREATE USER
    app.post("/users", async(req, res)=>{

        try {
            
            const {uid} = req;
            const {email, name, city, photoUrl} = req.body
            
            console.log("[CREATE USER]-> req.body.city: "+req.body.city);
            
            //const user = await auth.getUser(uid);
            await db.collection("users").doc(uid).set({
                uid,
                email,
                name,
                city,
                photoUrl,
                isActive: true,
                role: {
                    admin: false,
                    customer: false,
                    user: true
                }
            });

            await res.status(200).send({status: "OK"})

        } catch (error) {
            console.log(error);
            res.status(403).send({message: 'Error al crear usuario'});
        }
    });

    // UPDATE USER
    app.put("/users", async(req, res)=>{
        
        try{
            const {uid} = req;
            const {name, city, photoUrl} = req.body
            console.log(name, city, photoUrl);
            
            const userNewData = {
                name,
                city,
                photoUrl
            }
            await db.collection('users').doc(uid).update(userNewData).then(

                res.status(200).send({status: "OK"})
            ).catch(error=>{
                console.log(error);
                res.status(403).send({status: "ERROR"});
            });
        
        }catch(error){
            console.log(error);
            res.status(403).send({status: "ERROR GENERAL"});
        }
    });

    // UPLOAD PROFILE IMAGE
    app.post("/uploads", (req, res)=>{

        const busboy = new Busboy({headers: req.headers});
        //const tmpdir = os.tmpdir();

        // This object will accumulate all the fields, keyed by their name
        const fields = {};

        // This object will accumulate all the uploaded files, keyed by their name.
        const uploads = {};

        const {uid} = req;

        let newPath = "";


        // This code will process each non-file field in the form.
        busboy.on('field', (fieldname, val) => {
            // TODO(developer): Process submitted field values here
            console.log(`Processed field ${fieldname}: ${val}.`);
            fields[fieldname] = val;
        });

        const fileWrites = [];

        // This code will process each file uploaded.
        busboy.on('file', (fieldname, file, filename) => {
            // Note: os.tmpdir() points to an in-memory file system on GCF
            // Thus, any files in it must fit in the instance's memory.
            console.log(`Processed file ${filename}`);
            //const filepath = path.join(tmpdir, filename);
            //uploads[fieldname] = filepath;
            uploads[fieldname] = filename;


            // Extraer extension de archivo
            //const ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
            const ext = "jpeg";
            const dir = 'users/';
            const newName = uid;

            newPath = `${dir}${newName}`;
            //const bucketFile = petPortalBucket.file(dir+filename);
            const bucketFile = petPortalBucket.file(newPath);
            const writeStream = bucketFile.createWriteStream({
                resumable:false,
                gzip:true,
                metadata:{
                    contentType: "image/jpeg",
                    metadata:{
                        firebaseStorageDownloadTokens: uuid(),
                        description: "Imagen de perfil"
                    }
                }
            });
            file.pipe(writeStream);


            const promise = new Promise((resolve, reject) => {
            file.on('end', () => {
                writeStream.end();
            });
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
            });
            fileWrites.push(promise);
        });

        
        busboy.on('finish', async () => {
            await Promise.all(fileWrites);

            // TODO(developer): Process saved files here
            for (const file in uploads) {
            //fs.unlinkSync(uploads[file]);

            }

            
            console.log("UID -> ", uid);

            const config = {
                action: 'read',
                expires: '03-09-2491'
            };
            petPortalBucket.file(newPath).getSignedUrl(config, async(err, url) => {
                if (err) {
                console.error(err);
                res.status(500).end();
                return;
                }

                try{
                
                    const userNewImage = {
                        photoUrl: url
                    }
                    await db.collection('users').doc(uid).update(userNewImage).then(
        
                        res.send({photoUrl: url})
                        //res.status(200).send({status: "OK"})
                       
                    ).catch(error=>{
                        console.log(error);
                        res.status(403);
                    });
    
                    
                }catch(error){
                    console.log(error);
                    res.status(403);
                }
                
            });
            
        });

        busboy.end(req.rawBody);
        
    });



    // GET USER
    app.get("/users", async(req, res)=>{
        try{
            const {uid} = req;
            console.log('[GET USER]->uid', uid);
            const snap = await db.collection('users').doc(uid).get();
            const user = await snap.data();
            console.log('[GET USER]->user', user);
            res.status(200).send(user);
        }catch(error){
            console.log(error);
            res.status(403);
        }
    });

    // GET LINKS
    app.get("/links", async (req, res)=>{
        console.log(["GET LINKS"])
        try{
            const snap = await db.collection('links').where('isActive', '==', true).get();
            const data = snap.docs.map( item => item.data() );
            res.status(200).send(data);
        
        } catch(error){
            res.status(400).send({message: 'Error. No se pudieron obtener los links', error});
        }

    });

    // GET SERVICE CATEGORIES
    app.get("/services/categories", async(req, res)=>{
        ["GET SERVICES CATEGORIES"]
        try{
            const snap = await db.collection('services_category').where('isActive', '==', true).orderBy('name').get();
            const data = snap.docs.map( item => item.data() );
            console.log("[SERVICE RETURN DATA]->", data)
            res.status(200).send(data);
        }catch(error){
            console.log("[SERVICE RETURN ERROR]->", error.message)
            res.status(400).send({message: 'Error. No se puedieron obtener las categorias', error});
        }
    });

    // GET SERVICE
    app.get("/services/:state/:category", async(req, res)=>{
        const {state, category} = req.params;
        console.log("[SERVICE STATE - CATEGORY]->", state, category)
        try{
            const snap = await db.collection('services').where("state", "==", state).where("category", "==", category).get();
            const data = snap.docs.map( item => item.data() );
            res.status(200).send(data);
        }catch(error){
            res.status(400).send({message: 'Error. No se puedieron obtener los servicios', error});
        }
    });

    // GET STATES
    app.get("/states", async(req, res)=>{
        try{
            const snap = await db.collection('states').where('isActive', '==', true).orderBy('name').get();
            const data = snap.docs.map( item => item.data() );
            res.status(200).send(data);
        }catch(error){
            res.status(400).send({message: 'Error. No se puedieron obtener las regiones', error});
        }
    });

    // GET PLACES LIST
    app.get("/places", async(req, res)=>{
        try{
            const snap = await db.collection('places_list').where('isActive', '==', true).get();
            const data = snap.docs.map( item => item.data() );
            res.status(200).send(data);
        }catch(error){
            res.status(400).send({message: 'Error. No se puedieron obtener los lugares', error});
        }
    });

    // GET PLACE
    app.get("/places/:id", async(req, res)=>{
        
        const id = req.params.id;
    
        try{
            const snap = await db.collection('places').doc(id).get();
            const data = snap.data();
            res.status(200).send(data);
        }catch(error){
            res.status(400).send({message: 'Error. No se puedieron obtener los tips', error});
        }
        
    });

    // GET TIPS LIST
    app.get("/tips", async(req, res)=>{
        try{
            const snap = await db.collection('tips_list').where('isActive', '==', true).get();
            const data = snap.docs.map( item => item.data() );
            res.status(200).send(data);
        }catch(error){
            res.status(400).send({message: 'Error. No se puedieron obtener los tips', error});
        }
    });

    // GET TIP
    app.get("/tips/:id", async(req, res)=>{
        
        const id = req.params.id;
        console.log("TIP ID ->", id);
    
        try{
            const snap = await db.collection('tips').doc(id).get();
            const data = snap.data();
            res.status(200).send(data);
        }catch(error){
            res.status(400).send({message: 'Error. No se puedieron obtener los tips', error});
        }
        
    });


exports.api = functions.https.onRequest( app );



