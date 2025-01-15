import express from 'express';
import mongoose from 'mongoose';

const app = express();

// testavimas:
// try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/virtualBank');
//     console.log('veikia')
// } catch (error) {
//     console.log('neveikia')
// }
// app.post('/', async (req, res) => {
//     res.json('Hello');
// });

await mongoose.connect('mongodb://127.0.0.1:27017/virtualBank');

const Accounts = mongoose.model('Accounts', { 
    firstName: String,
    lastName: String, 
    accountNumber: String,
    personalId: String,
    passportPhoto: String,
    balance: Number
 });

// Konfiguracinė eilutė norint gauti duomenis JSON formatu
app.use(express.json());

// grąžina visus įrašus iš duomenų bazės
app.get('/api', async (req, res) => {
    const data = await Accounts.find(); 
    res.json(data);
});

// grąžina sąskaitos įrašą pagal id iš duomenų bazės
app.get('/api/:id', async (req, res) => {
    const data = await Accounts.findById(req.params.id); 
    res.json(data);
});

// sukuria naują įrašą
app.post('/api', async (req, res) => {    
    req.body.balance = 0;
    await Accounts.create(req.body); 
    res.json('Produktas sekmingai pridėtas');
});

// suranda įrašą pagal id ir atnaujina jo duomenis
app.put('/api/:id', async (req, res) => {
    await Accounts.findByIdAndUpdate(req.params.id, req.body); 
    res.json('Produktas sėkmingai atnaujintas');
});

// suranda įrašą pagal id ir jį ištrina
app.delete('/api/:id', async (req, res) => {
    await Accounts.findByIdAndDelete(req.params.id); 
    res.json('Produktas sėkmingai pašalintas');
});

app.listen(3000);