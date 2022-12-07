import diagnoseData from '../data/diagnoses'
import { Diagnoses } from '../types'

const getEntries = (): Array<Diagnoses> => {
    return diagnoseData;
};

const addDiagnose = () => {
    return null
}

export default { getEntries, addDiagnose };