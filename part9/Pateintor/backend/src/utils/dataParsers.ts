import { Discharge, Gender, healthCheckRating } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  }

export const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing attribute: ' + text);
    }

    return text;
}

export const isDate = (date: string): boolean => {
    console.log(Boolean(Date.parse(date)))
    return Boolean(Date.parse(date));
  }

export const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender)
}

export const parseStringArray = (type: any): string[] => {
    const checkArray = type.map((code: unknown) => {
        if (!isString(code)) {
            throw new Error('Incorrect or missing diagnosisCode' + code)
        }
        return code
    })
    return checkArray
}


const isHealthCheckRating = (checkRating: any): checkRating is healthCheckRating => {
    console.log(checkRating)
    return Object.values(healthCheckRating).includes(checkRating)
}

export const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
      throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
  }
  
export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)){
      throw new Error('Incorrect or missing date: ' + gender);
    }
    return gender;
  }

export const parseHealthCheck = (healthCheck: unknown): healthCheckRating => {
    if (!isHealthCheckRating(healthCheck)) {
        throw new Error('Incorrect or missing attribute for healthCheckRating');
    }
    
    return healthCheck;
}

export const parseDischarge = (discharge: any): Discharge => {
    if(!discharge ) {
        throw new Error('Incorrect or missing attribute for Discharge field');
    }
    if (!isString(discharge.criteria)) {
        throw new Error('Incorrect or missing attribute for Discharge criteria field: ' + discharge.criteria)
    }
    if (!isDate(discharge.date)) {
        throw new Error('Incorrect or missing attrivute for Discharge date field: '+ discharge.date)
    }
    return discharge;
}
