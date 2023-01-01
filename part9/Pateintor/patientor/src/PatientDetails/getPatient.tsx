import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const getPatient = async (id: string) => {
    const data = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`);
    console.log(data.data);

    return data;
};

export default getPatient;