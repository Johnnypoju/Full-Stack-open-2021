import { NewPatientEntry } from '../types';
import { parseDateOfBirth, parseGender, parseString  } from './dataParsers';


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