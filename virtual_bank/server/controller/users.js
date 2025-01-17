import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import users from '../models/users.js';

const router = Router();

router.get('/users', auth, async (req, res) => {
    try {
        res.json(await users.find());
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.post('/login', async (req, res) => {
    if(!req.body.email || !req.body.password)
        return res.status(500).json('Negauti prisijungimo duomenys');
    const data = await users.findOne({ email: req.body.email, password: req.body.password });
    
    if(!data) 
        return res.status(401).json('Neteisingi prisijungimo duomenys');
    
    req.session.user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
    };

    res.json(req.session.user);
});

router.post('/register', async (req, res) => {
    try {
        await users.create(req.body);

        res.json('Vartotojas sėkmingai užregistruotas');
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/check-auth', auth, (req, res) => {
    res.json(req.session.user);
});

router.get('/logout', auth, (req, res) => {
    // Sesijos duomenų ištrynimas
    req.session.destroy();

    res.json("Sėkmingai atsijungėte");
});

export default router;