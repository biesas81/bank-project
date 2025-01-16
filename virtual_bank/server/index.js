import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

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

        // patikriname, ar toks IBAN numeris jau egzistuoja
        const existingAccount = await Accounts.findOne({ accountNumber: iban });

        // jei nėra sąskaitos su tuo IBAN, tada jis unikalus
        if (!existingAccount) {
            isUnique = true;
        }
    }
    return iban;
}
app.use('/nuotraukos', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads'); // failai bus įkeliami į 'uploads' aplanką
    },
    filename: function (req, file, next) {
        next(null, Date.now() + '.jpg'); // failas bus išsaugotas su laiko žymekliu ir '.jpg' plėtiniu
    }
});
const upload = multer({ storage: storage });

function personalIdCheck(personalId) {
    // ar asmens kodas yra 11 skaitmenų
    if (!/^\d{11}$/.test(personalId)) {
        return false;
    }

    // ar kontrolinis skaičius teisingas
    const checkDigit = parseInt(personalId[10], 10); // Paskutinis skaitmuo
    const baseDigits = personalId.slice(0, 10).split('').map(digit => parseInt(digit, 10));

    // skaičiavimas pagal pirmąją formulę
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += baseDigits[i] * (i + 1);
    }
    sum = sum + baseDigits[9];

    let calculatedCheckDigit = sum % 11;
    if (calculatedCheckDigit !== 10) {
        if (calculatedCheckDigit !== checkDigit) {
            return false;
        }
        return true;
    }

    // jei liekana 10, naudojame antrąją formulę
    sum = 0;
    for (let i = 0; i < 7; i++) {
        sum += baseDigits[i] * (i + 3);
    }
    for (let i = 7; i < 10; i++) {
        sum += baseDigits[i] * (i - 6);
    }


    calculatedCheckDigit = sum % 11;
    if (calculatedCheckDigit !== 10 && calculatedCheckDigit !== checkDigit) {
        return false;
    }

    return true;
}

// Tikriname, ar asmens kodas yra unikalus
async function uniquePersonalId(personalId) {
    const existingAccount = await Accounts.findOne({ personalId: personalId });
    return !existingAccount;  // Jeigu nėra, tai unikalus
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
app.post('/api', upload.single('passportPhoto'), async (req, res) => {
    const accountData = req.body;
    const personalId = accountData.personalId;

    if (!personalIdCheck(personalId)) {
        return res.status(400).json('Neteisingas asmens kodas');
    }

    const isUnique = await uniquePersonalId(personalId);
    if (!isUnique) {
        return res.status(400).json('Asmens kodas jau egzistuoja');
    }

    if (req.file) {
        accountData.passportPhoto = req.file.filename; // saugome failo pavadinimą duomenų bazėje
    }

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