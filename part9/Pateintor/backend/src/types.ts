
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnoses['code']>;
}

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: healthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry = 
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    ssn: string;
    entries: Entry[];
}

export type PatientsWithoutSsn = Omit<Patients, "ssn">

export type NewEntry = Omit<HospitalEntry, "id">
                    | Omit<OccupationalHealthcareEntry, "id">
                    | Omit<HealthCheckEntry, "id">;

export type NewPatientEntry = Omit<Patients, "id">

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }