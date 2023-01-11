import { Grid, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { NewEntry } from "../types";


interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
  }

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
  
    return (
      <Formik
        initialValues={{
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [],
          type: "HealthCheck",
          healthCheckRating: 0
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          } 
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          } 
          if (!values.diagnosisCodes) {
            errors.diagnosisCodes = requiredError;
          } 
          if (!values.type) {
            errors.type = requiredError;
          }
          return errors;
        }}
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
            <Field 
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
            /> 
             <Field 
                label="Date"
                placeholder="Date"
                name="date"
                component={TextField}
            /> 
             <Field 
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
            /> 
             <Field 
                label="Healthcheck Rating"
                placeholder="Healthcheck Rating"
                name="healthCheckRating"
                component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
        <Grid>
            <Grid item>
                <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left"}}
                    type="button"
                    onClick={onCancel}
                    >
                        Cancel
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    style={{ float: "right"}}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                >
                    Add
                </Button>
            </Grid>
        </Grid>
            
          </Form>
        );
      }};
    </Formik>
    );
  };

  export default AddEntryForm;