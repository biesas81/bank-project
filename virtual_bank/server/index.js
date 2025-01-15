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

// konfiguracinė eilutė norint gauti duomenis JSON formatu
app.use(express.json());

// funkcija atsitiktinių skaičių generavimui
function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function generateIBAN() {
    const countryCode = 'LT'; // Lietuva
    const bankCode = '73000'; // fiksuotas banko kodas
    const bankDigits = random(10, 99); // atsitiktiniai 2 skaitmenys, 10-99
    const oldAccount = random(10000000000, 99999999999); // atsitiktiniai 11 skaitmenų

    // sugeneruojame IBAN numerį
    return `${countryCode}${bankDigits}${bankCode}${oldAccount}`;
}

async function generateUniqueIBAN() {
    let iban;
    let isUnique = false;

    while (!isUnique) {
        iban = generateIBAN();

        // Pptikriname, ar toks IBAN numeris jau egzistuoja
        const existingAccount = await Accounts.findOne({ accountNumber: iban });

        // jei nėra sąskaitos su tuo IBAN, tada jis unikalus
        if (!existingAccount) {
            isUnique = true;
        }
    }
    return iban;
}

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
    const accountData = req.body;
    
    try {
        const iban = await generateUniqueIBAN();
        accountData.accountNumber = iban; //priskiriama unikalus sąskaitos nr.
        accountData.balance = 0;  // pradinis balansas visada bus 0
        await Accounts.create(accountData); 
        res.json('Produktas sekmingai pridėtas');
    } catch (err) {
        res.status(500).json('Įvyko klaida kuriant sąskaitą');
    }
});

// suranda įrašą pagal id ir atnaujina jo duomenis
app.put('/api/:id', async (req, res) => {
    await Accounts.findByIdAndUpdate(req.params.id, req.body); 
    res.json('Sąskaitos informacija sėkmingai atnaujinta');
});

// suranda įrašą pagal id ir jį ištrina
app.delete('/api/:id', async (req, res) => {
    await Accounts.findByIdAndDelete(req.params.id); 
    res.json('Sąskaita sėkmingai ištrinta');
});

app.listen(3000);