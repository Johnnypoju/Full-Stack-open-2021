import { Entry, NewEntry } from "../types";
import { parseString, parseStringArray, parseHealthCheck, parseDischarge } from "./dataParsers";



const toNewEntryForPatient = (object: Entry): NewEntry =>{
    const entry = {
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseStringArray(object.diagnosisCodes)
    }
    switch(object.type) {
        case "HealthCheck":
            return { ...entry, type: object.type, healthCheckRating: parseHealthCheck(object.healthCheckRating)}
        case "Hospital":
            return { ...entry, type: object.type, discharge:parseDischarge(object.discharge)}
        case "OccupationalHealthcare":
            return { ...entry, type: object.type, employerName: parseString(object.employerName), sickLeave: object.sickLeave}
    }   
}

export default toNewEntryForPatient;