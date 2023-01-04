import { useStateValue } from "../state";
import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntryForm";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthCareEntry";




const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
    const [{diagnoses}] = useStateValue();
    
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} discharge={entry.discharge}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthCareEntry entry={entry} diagnoses={diagnoses} employer={entry.employerName} sickLeave={entry.sickLeave}/>;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses} rating={entry.healthCheckRating}/>;
        default:
            return <div></div>;
    }
};

export default EntryDetails;