import { Entry, healthCheckRating } from "../types";
import { Diagnoses } from "../types";
import { Card, Box } from "@material-ui/core";
import FavoriteIcon from '@mui/icons-material/Favorite';
import healthRatingColor from "../components/healthRatingColors";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';


const HealthCheckEntry = ({ entry, diagnoses, rating}: {entry: Entry, diagnoses: Diagnoses[], rating: healthCheckRating}) => {
    const ratingColor = healthRatingColor(rating);

    if (entry.diagnosisCodes !== undefined) {
        return <Card className="paper" raised={true} key={entry.id}>{entry.date} <MedicalInformationIcon /> <br></br><i>{entry.description}</i><br></br><FavoriteIcon style={{color: ratingColor}} /> 
        <Box padding="10px">{entry.diagnosisCodes.map((diagnosisCode, index) => {
            return <li key={index} className="padded">{diagnosisCode} {diagnoses.find(diagnosis => diagnosis.code === diagnosisCode)?.name}</li>;
        })}</Box><p>specialist: {entry.specialist}</p></Card>;

    
    }
    else {
        return <Card raised={true} className="paper" key={entry.id}>{entry.date} <MedicalInformationIcon /><br></br><i>{entry.description}</i><br></br><FavoriteIcon style={{color: ratingColor}} /> <br></br>
        specialist: {entry.specialist}
        </Card>;
    }
};

export default HealthCheckEntry;