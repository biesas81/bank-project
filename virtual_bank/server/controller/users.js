import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import users from '../models/users.js';
import bcrypt from 'bcrypt';

const router = Router();

router.get('/users', auth, async (req, res) => {
    try {
        res.json(await users.find());
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password)
            return res.status(400).json('Negauti prisijungimo duomenys');

        const data = await users.findOne({ email: req.body.email });

        if (!data)
            return res.status(401).json('Neteisingi prisijungimo duomenys');

        if(!await bcrypt.compare(req.body.password, data.password)) 
            return res.status(401).json('Neteisingi prisijungimo duomenys');

        req.session.user = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        };

        res.json(req.session.user);
    } catch (error) {
        console.error("Error during login:", error); // Pridedame klaidos žinutę
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.post('/register', async (req, res) => {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await users.create(req.body);

        res.json('Vartotojas sėkmingai užregistruotas');
    } catch(e) {
        console.log(e);
        res.status(500).json('Įvyko serverio klaida');
    }


    // try {
    //     await users.create(req.body);

    //     res.json('Vartotojas sėkmingai užregistruotas');
    // } catch {
    //     res.status(500).json('Įvyko serverio klaida');
    // }
});

router.get('/check-auth', auth, (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Vartotojas neprisijungęs' });
        }
        res.json(req.session.user);
    } catch (error) {
        res.status(500).json('Įvyko serverio klaida');
    }
    });

router.get('/logout', auth, (req, res) => {
    try {
    req.session.destroy();
    res.json("Sėkmingai atsijungėte");
    } catch (error) {
        res.status(500).json('Įvyko serverio klaida');
    }

});

export default router;