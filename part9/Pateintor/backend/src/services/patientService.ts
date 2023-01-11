import patientData from "../data/patients";
import { Patients, PatientsWithoutSsn, NewPatientEntry, Entry, NewEntry } from "../types";

import { v1 as uuid } from 'uuid';
import errorLogger from "../utils/errorLogger";

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
    console.log(newPatientEntry)
    patientData.push(newPatientEntry)
    console.log(patientData)
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

const pushEntry = ( entry: Entry, patientId: string) => {
    try {
    patientData.map((data) => {
        if(data.id === patientId) data.entries.push(entry)
    })
    } catch (error: unknown) {
        errorLogger(error);
    }
    return entry;
}

const addEntry = ( object: NewEntry, patientId: string): Entry => {
    const entry = {
        id: id,
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: object.diagnosisCodes
    }
    let addedEntry
    switch(object.type) {
        case "HealthCheck":
            addedEntry = {...entry, type: object.type, healthCheckRating: object.healthCheckRating};
            break;
        case "Hospital":
            addedEntry = {...entry, type: object.type, discharge: object.discharge};
            break;
        case "OccupationalHealthcare":
            addedEntry = {...entry, type: object.type, sickLeave: object.sickLeave, employerName: object.employerName}
            break;
    }
    return pushEntry(addedEntry, patientId)
    
}


export default { getEntries, addPatient, getPatient, addEntry}