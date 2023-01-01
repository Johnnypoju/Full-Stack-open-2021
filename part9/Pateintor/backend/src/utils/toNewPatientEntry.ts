import { NewPatientEntry, Gender } from '../types';


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender)
}

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing attribute: ' + text);
  }

  return text;
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
    throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)){
    throw new Error('Incorrect or missing date: ' + gender);
  }
  return gender;
}

type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown};

const toNewPatientEntry = ({ name, dateOfBirth, gender, occupation, ssn} : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
    entries: [ ]
  };

  return newEntry;
};

export default toNewPatientEntry;