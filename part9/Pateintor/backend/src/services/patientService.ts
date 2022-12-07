import patientData from "../data/patients";
import { PatientsWithoutSsn } from "../types";



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

const addPatient = () => {
    return null
}

export default { getEntries, addPatient}