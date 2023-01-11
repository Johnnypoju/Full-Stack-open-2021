import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';
import toNewEntryForPatients from "../utils/toNewEntryForPatient";

const router = express.Router()


// get all patients
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

//get all patient info
router.get('/:id', (req, res) => {
    
    res.send(patientService.getPatient(req.params.id))
});

// add new patient
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

// add new entry for a patient
router.post('/:id/entries', (req, res) => {
    try {
        //console.log(req.body)
        const newEntry = toNewEntryForPatients(req.body)
        const addedEntry = patientService.addEntry(newEntry, req.params.id)
        res.status(200).json(addedEntry);
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