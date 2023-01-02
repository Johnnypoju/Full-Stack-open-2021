import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router()


router.get('/', (_req, res) => {
    const result = diagnoseService.getEntries()
    console.log(result)
    res.send(result)
});

router.post('/', (_req, res) => {
    res.send()
});

export default router;