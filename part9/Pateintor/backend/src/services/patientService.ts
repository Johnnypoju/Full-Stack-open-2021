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
            entries: data.entries
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
        occupation: object.occupation,
        entries: object.entries
    }
    patientData.push(newPatientEntry)
    return newPatientEntry
}

const getPatient = ( patient: string): Patients => {
    const patientInfo = <Patients>patientData.find((data) => data.id === patient)
    if (!patientInfo.entries) {
    const patientInfoWithEntries = {
        id: patientInfo.id,
        name: patientInfo.name,
        dateOfBirth: patientInfo.dateOfBirth,
        ssn: patientInfo.ssn,
        gender: patientInfo.gender,
        occupation: patientInfo.occupation,
        entries: [ ]
    };
    return patientInfoWithEntries;
    };
    return patientInfo;
}

export default { getEntries, addPatient, getPatient}