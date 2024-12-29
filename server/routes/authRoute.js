import express from 'express';

const router = express.Router();

//login
router.get('/login', (req, res) => {
    res.send('Login');
});
//register

export default router;