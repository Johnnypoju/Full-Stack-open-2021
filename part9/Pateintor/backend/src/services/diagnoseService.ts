import diagnoseData from '../data/diagnoses'
import { Diagnoses } from '../types'

const getEntries = (): Array<Diagnoses> => {
    return diagnoseData;
};

export default { getEntries };