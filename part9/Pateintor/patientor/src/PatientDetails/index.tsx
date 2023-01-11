import { useStateValue, setPatient } from "../state";
import React from "react";
import { useParams } from "react-router-dom";
import getPatient from "./getPatient";
import GenderReveal from "./genderReveal";
import "../index.css";
import EntryDetails from "./EntryDetails";
import { Stack } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Entry, NewEntry } from "../types";

const PatientDetailsPage = () => {
    const [ {patient}, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    
    const submitNewEntry = async (values: NewEntry) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients`,
            values
            );
            dispatch(addEntry(newEntry));
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
            console.error("Unknown error", e);
            setError("Unknown error");
            }
        }
        };
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
    <Stack spacing={3}>
    {patient.entries.map((entry) => {
        return (<EntryDetails key={entry.id} entry={entry}/>);
        
    })}
    </Stack>
    <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Medical Entry
      </Button>
     </div>);
    
};

export default PatientDetailsPage;