import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { Diagnoses, NewHospitalEntry } from "../types";
import { TextField, DiagnosisSelection } from "./FormField";

interface Props {
    onSubmit: (values: NewHospitalEntry) => void;
    onCancel: () => void;
    diagnoses: Diagnoses[];
  }

const Hospital = ( {onSubmit, onCancel, diagnoses}: Props ) => {
 return( 
        <Formik
          initialValues={{
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [""],
            discharge: {
              date: "",
              criteria: ""
            },
            type: "Hospital"
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
                  label="Discharge date"
                  placeholder="Discharge date"
                  name="discharge.date"
                  component={TextField}
              />
              <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="discharge.criteria"
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
        }}
      </Formik>
      );
};

export default Hospital;
