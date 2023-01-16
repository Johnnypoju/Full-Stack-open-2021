/*import { Grid, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField, SelectField } from "./FormField";*/
import { useStateValue } from "../state";
import { NewEntry } from "../types";
import HealtCheckForm from "../AddEntryForms/HealthCheckForm";
import OccupationalHealthcare from "../AddEntryForms/OccupationalHealthcare";
import Hospital from "../AddEntryForms/Hospital";


interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
    type: string;
  }



export const AddEntryForm = ({ onSubmit, onCancel, type}: Props) => {
  const [{ diagnoses }] = useStateValue();
  switch(type) {
    case "HealthCheck":
      return  <HealtCheckForm onSubmit={onSubmit} onCancel={onCancel} diagnoses={diagnoses}/>;
    case "Hospital":
      return <Hospital onSubmit={onSubmit} onCancel={onCancel} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare onSubmit={onSubmit} onCancel={onCancel} diagnoses={diagnoses} />;
    default:
      return <div></div>;
    }
    
  };

  export default AddEntryForm;