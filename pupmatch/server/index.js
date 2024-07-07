const express = require('express');
const { db } = require('./Firebaseadmin.js');

const app = express();
app.use(express.json());

app.post('/api/data', async (req, res) => {
  const { petId, name, age, gender, size, breed, photos } = req.body;

  try {
    await db.collection('pets').doc(petId).set({
      name,
      age,
      gender,
      size,
      breed,
      photos,
    });
    res.status(200).send('Pet profile saved successfully');
  } catch (error) {
    console.error('Error saving pet profile', error);
    res.status(500).send('Error saving pet profile');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
