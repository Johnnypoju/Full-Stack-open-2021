import { useStateValue, setPatient } from "../state";
import { useParams } from "react-router-dom";
import getPatient from "./getPatient";
import GenderReveal from "./genderReveal";

const PatientDetailsPage = () => {
    const [{patient}, dispatch] = useStateValue();
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
    
    return <div>
    <h2>{patient.name} <GenderReveal gender={patient.gender}/></h2> 
    <p>ssn: {patient.ssn}<br></br>
    occupation: {patient.occupation}</p>
     </div>;
    
};

export default PatientDetailsPage;