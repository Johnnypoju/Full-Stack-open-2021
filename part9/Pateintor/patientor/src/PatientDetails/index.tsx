import { useStateValue, setPatient } from "../state";
import { useParams } from "react-router-dom";
import getPatient from "./getPatient";
import GenderReveal from "./genderReveal";
import "../index.css";

const PatientDetailsPage = () => {
    const [{diagnoses, patient}, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    
     
    try {
        
        if (typeof id === 'string' && patient.id !== id) {
            getPatient(id).then(
                (data) => {dispatch(setPatient(data.data));}
            ).catch(error => console.log(error));
            
        }
        
        
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
    
    return (<div>
    <h2>{patient.name} <GenderReveal gender={patient.gender}/></h2> 
    <p>ssn: {patient.ssn}<br></br>
    occupation: {patient.occupation}</p>
    <h3>entries</h3>
    {patient.entries.map((entry) => {
        if (entry.diagnosisCodes !== undefined) {
            console.log(diagnoses);
                return <p key={entry.id}>{entry.date} {entry.description}
                {entry.diagnosisCodes.map((diagnosisCode, index) => {
                    return <li key={index} className="padded">{diagnosisCode} {diagnoses.find(diagnosis => diagnosis.code === diagnosisCode)?.name}</li>;
                })}</p>;
           
            
        }
        else {
            return <p key={entry.id}>{entry.date} {entry.description}</p>;
        }
        
    })}
     </div>);
    
};

export default PatientDetailsPage;