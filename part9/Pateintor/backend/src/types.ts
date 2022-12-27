
export interface Entry {
    
}

export interface Diagnoses {
    code: string,
    name: string,
    latin?: string
}

export interface Patients {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    ssn: string,
    entries: Entry[]
}

export type PatientsWithoutSsn = Omit<Patients, "ssn">

export type NewPatientEntry = Omit<Patients, "id">

export enum Gender {
    male,
    female,
    other
  }