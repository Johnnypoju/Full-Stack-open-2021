import { Entry, SickLeave  } from "../types";
import { Diagnoses } from "../types";
import { Box, Card, Typography } from "@material-ui/core";
import WorkIcon from '@mui/icons-material/Work';



const OccupationalHealtCareEntry = ({ entry, diagnoses, employer, sickLeave}: {entry: Entry, diagnoses: Diagnoses[], employer: string, sickLeave: SickLeave | undefined}) => {
 
    if (sickLeave !== undefined) {
        if (entry.diagnosisCodes !== undefined) {
            return <Card className="paper" raised={true} key={entry.id}>{entry.date} <WorkIcon /> {employer}<br></br><i>{entry.description}</i>
            <Box padding="10px">{entry.diagnosisCodes.map((diagnosisCode, index) => {
                return <li key={index} className="padded">{diagnosisCode} {diagnoses.find(diagnosis => diagnosis.code === diagnosisCode)?.name}</li>;
            })}</Box>
            <Box >
                <Typography variant="h6">
                    SickLeave duration: 
                </Typography>
                <Box padding="10px">
                    Start Date: {sickLeave.startDate}<br></br>
                    End Date: {sickLeave.endDate}
                </Box>
                
                </Box>specialist: {entry.specialist}</Card>;
    
        
        }
        else {
            return <Card raised={true} className="paper" key={entry.id}>{entry.date} <WorkIcon /> {employer}<br></br><i>{entry.description}</i> <br></br>
            specialist: {entry.specialist}
            </Card>;
        }
    }
    else {
        if (entry.diagnosisCodes !== undefined) {
            return <Card className="paper" raised={true} key={entry.id}>{entry.date} <WorkIcon /> {employer}<br></br><i>{entry.description}</i>
            <Box padding="10px">{entry.diagnosisCodes.map((diagnosisCode, index) => {
                return <li key={index} className="padded">{diagnosisCode} {diagnoses.find(diagnosis => diagnosis.code === diagnosisCode)?.name}</li>;
            })}</Box>
            <Box padding="10px">
                </Box><br></br>specialist: {entry.specialist}</Card>;
    
        
        }
        else {
            return <Card raised={true} className="paper" key={entry.id}>{entry.date} <WorkIcon /> {employer}<br></br><i>{entry.description}</i> <br></br>
            specialist: {entry.specialist}
            </Card>;
        }
    }
    
};

export default OccupationalHealtCareEntry;