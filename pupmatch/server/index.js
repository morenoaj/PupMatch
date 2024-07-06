const express = require('express');
require('dotenv').config();
const db = require('./Firebaseadmin'); // Importar el archivo correctamente

const app = express();
app.use(express.json());

app.post('/api/data', async (req, res) => {
    try {
        const data = req.body;
        const docRef = await db.collection('prueba').add(data);
        res.status(200).send(`Document written with ID: ${docRef.id}`);
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).send('Error adding document');
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const snapshot = await db.collection('prueba').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(data);
    } catch (error) {
        console.error('Error getting documents: ', error);
        res.status(500).send('Error getting documents');
    }
});

app.get('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await db.collection('prueba').doc(id).get();
        if (!doc.exists) {
            res.status(404).send('Document not found');
        } else {
            res.status(200).json({ id: doc.id, ...doc.data() });
        }
    } catch (error) {
        console.error('Error getting document: ', error);
        res.status(500).send('Error getting document');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
