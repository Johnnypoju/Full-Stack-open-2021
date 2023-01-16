import { useStateValue, setPatient, addEntry } from "../state";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import getPatient from "./getPatient";
import GenderReveal from "./genderReveal";
import "../index.css";
import EntryDetails from "./EntryDetails";
import { Stack } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import { Button, Grid } from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Entry, NewEntry } from "../types";


const PatientDetailsPage = () => {
    const [ {patient}, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [ type, setType ] = useState("");
    
    const openModal = (type: string): void => {
        setModalOpen(true);
        setType(type);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    
    const submitNewEntry = async (values: NewEntry) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${patient.id}/entries`,
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
    <Stack spacing={3} style={{ marginBottom: "1em" }}>
    {patient.entries.map((entry) => {
        return (<EntryDetails key={entry.id} entry={entry}/>);
        
    })}
    </Stack>
        <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            type={type}
        />
    <Grid container spacing={2}>
        <Grid item>
            <Button variant="contained" onClick={() => openModal("HealthCheck") } style={{ float: "left"}}>
                Add New HealthCheck Entry
            </Button>
        </Grid>
        <Grid item>
            <Button variant="contained" onClick={() => openModal("OccupationalHealthcare") } style={{ float: "left"}}>
                Add New Occupational Healthcare Entry
            </Button>
        </Grid>
        <Grid item>
            <Button variant="contained" onClick={() => openModal("Hospital") } style={{ float: "left"}}>
                Add New Hospital Entry
            </Button>
        </Grid>
      </Grid>
     </div>);
    
};

export default PatientDetailsPage;