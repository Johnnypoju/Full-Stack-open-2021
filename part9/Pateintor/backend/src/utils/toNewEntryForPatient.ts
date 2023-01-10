import { Entry, NewEntry, healthCheckRating } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  }

const parseString = (text: unknown): string => {
if (!text || !isString(text)) {
    throw new Error('Incorrect or missing attribute: ' + text);
}

return text;
}

const parseDiagnosisCodes = (type: any): string[] => {
    const checkArray = type.map((code: unknown) => {
        return isString(code)
    })
    return checkArray
}

const isHealthCheckRating = (checkRating: any): checkRating is healthCheckRating => {
    return Object.values(healthCheckRating).includes(checkRating)
}

const parseHealthCheck = (healthCheck: any): healthCheckRating => {
    if (!healthCheck || !isHealthCheckRating(healthCheck)) {
        throw new Error('Incorrect or missing attribute: ' + healthCheck);
    }
    return healthCheck;
}


const toNewEntryForPatient = (object: Entry): NewEntry =>{
    const entry = {
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    }
    switch(object.type) {
        case "HealthCheck":
            return { ...entry, type: object.type, healthCheckRating: parseHealthCheck(object.healthCheckRating)}
        case "Hospital":
            return { ...entry, type: object.type, discharge: object.discharge}
        case "OccupationalHealthcare":
            return { ...entry, type: object.type, employerName: object.employerName, sickLeave: object.sickLeave}
    }            
}

export default toNewEntryForPatient;