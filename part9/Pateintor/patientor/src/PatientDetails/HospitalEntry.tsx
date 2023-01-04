import { Entry, Discharge } from "../types";
import { Diagnoses } from "../types";
import { Card, Box } from "@material-ui/core";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const HospitalEntry = ({ entry, diagnoses, discharge}: {entry: Entry, diagnoses: Diagnoses[], discharge: Discharge}) => {

    if (entry.diagnosisCodes !== undefined) {
        return <Card className="paper" raised={true} key={entry.id}>{entry.date} <LocalHospitalIcon /><br></br><i>{entry.description} </i>
        <Box padding="10px">{entry.diagnosisCodes.map((diagnosisCode, index) => {
            return <li key={index} className="padded">{diagnosisCode} {diagnoses.find(diagnosis => diagnosis.code === diagnosisCode)?.name}</li>;
        })}</Box><Box padding="5px"><b>Discharge date: </b>{discharge.date} <br></br>
        <b>Criteria for discharge:</b> {discharge.criteria}</Box><br></br>
        specialist: {entry.specialist}</Card>;

    
    }
    else {
        return <Card raised={true} className="paper" key={entry.id}>{entry.date} <LocalHospitalIcon /><br></br><i>{entry.description}</i> <LocalHospitalIcon /><br></br>
        specialist: {entry.specialist}
        </Card>;
    }
};

export default HospitalEntry;