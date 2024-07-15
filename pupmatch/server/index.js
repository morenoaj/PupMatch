require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const paypalRoutes = require('./routes/paypal');
const { db } = require('./Firebaseadmin');
const sendEmail = require('./mail');
const subscriptionRoutes = require('./routes/subscription');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/paypal', paypalRoutes);
app.use('/api', subscriptionRoutes);

// Ruta para guardar los datos del perfil de la mascota
app.post('/api/data', async (req, res) => {
  const { petId, name, age, gender, size, breed, photos, description, vet, vaccinated, allergies, allergyDetails, park } = req.body;

  try {
    // Guardar datos en Firestore en el mismo documento de usuario
    await db.collection('pets').doc(petId).set({
      name,
      age,
      gender,
      size,
      breed,
      photos,
      description,
      vet,
      vaccinated,
      allergies,
      allergyDetails,
      park
    }, { merge: true });

    res.status(200).send('Pet profile saved successfully');
  } catch (error) {
    console.error('Error saving pet profile', error);
    res.status(500).send('Error saving pet profile');
  }
});

// Ruta para iniciar sesión y establecer una cookie segura
app.post('/api/login', async (req, res) => {
  const { uid } = req.body;

  try {
    // Guardar el ID del usuario en una cookie segura
    res.cookie('userId', uid, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).send('User logged in successfully');
  } catch (error) {
    console.error('Error logging in user', error);
    res.status(500).send('Error logging in user');
  }
});

// Ruta para cerrar sesión y limpiar la cookie
app.post('/api/logout', (req, res) => {
  // Limpiar la cookie del ID del usuario
  res.clearCookie('userId');
  res.status(200).send('User logged out successfully');
});

// Iniciar el servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
