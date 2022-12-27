import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';

const router = express.Router()

router.get('/',(_req, res) => {
    try {
        res.send(patientService.getEntries());
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error ) {
            errorMessage += 'Error: ' + error.message;
            console.log(errorMessage);
        }
        res.status(400).send(errorMessage)
    }
});

router.get('/:id', (req, res) => {
    
    res.send(patientService.getPatient(req.params.id))
})

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
            console.log(errorMessage);
        }
        res.status(400).send(errorMessage);
    }

});


export default router;