import { Formik, Form, Field } from "formik";
import { Grid, Button, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import { Diagnoses, NewOccupationalHealthcareEntry } from "../types";
import { TextField, DiagnosisSelection } from "./FormField";
import { useState } from "react";

interface Props {
    onSubmit: (values: NewOccupationalHealthcareEntry) => void;
    onCancel: () => void;
    diagnoses: Diagnoses[];
  }



const OccupationalHealthcare = ( {onSubmit, onCancel, diagnoses}: Props ) => {
  const [ sickLeaveCheck, setSickLeaveCheck ] = useState(false);
  console.log(sickLeaveCheck);

  const sickLeaveToggle = () => {
    setSickLeaveCheck(!sickLeaveCheck);
    
  };

 return( 
        <Formik
          initialValues={{
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [""],
            employerName: "",
            type: "OccupationalHealthcare"
          }}
          onSubmit={onSubmit}
          validate={(values) => {
            console.log(values);
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
            if (!values.employerName) {
              errors.employerName = requiredError;
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
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <FormGroup>
                <FormControlLabel control={<Switch onChange={sickLeaveToggle}/> } label="Sick leave" />
                {sickLeaveCheck && (
                  <>
                  <Field open={sickLeaveCheck}
                  label="Start date"
                  placeholder="Start date"
                  name="sickLeave.startDate"
                  component={TextField}
                  />
                  <Field open={sickLeaveCheck}
                    label="End date"
                    placeholder="End date"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                  </>
                )}
                
              </FormGroup>
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
        }}
      </Formik>
      );
};

export default OccupationalHealthcare;
