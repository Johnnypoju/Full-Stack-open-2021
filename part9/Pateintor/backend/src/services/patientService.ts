import patientData from "../data/patients";
import { Patients, PatientsWithoutSsn, NewPatientEntry } from "../types";

import { v1 as uuid } from 'uuid';

const id = uuid()

const getEntries = (): Array<PatientsWithoutSsn> => {
    const filteredPatients = patientData.map((data) => {
        return {
            id: data.id,
            name: data.name,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            occupation: data.occupation,
        }})
    return filteredPatients;
}

const addPatient = ( object: NewPatientEntry ): Patients => {
    const newPatientEntry = {
        id: id,
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        ssn: object.ssn,
        gender: object.gender,
        occupation: object.occupation
    }
    patientData.push(newPatientEntry)
    return newPatientEntry
}

export default { getEntries, addPatient}