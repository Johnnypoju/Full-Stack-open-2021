import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { Diagnoses, healthCheckRating, NewEntry } from "../types";
import { TextField, SelectField, DiagnosisSelection } from "./FormField";

interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
    diagnoses: Diagnoses[];
  }

  const healtCheckRatingOptions = [
    { value: healthCheckRating.Healthy, label: "Healthy"},
    { value: healthCheckRating.LowRisk, label: "Low Risk"},
    { value: healthCheckRating.HighRisk, label: "High Risk"},
    { value: healthCheckRating.CriticalRisk, label: "Critical Risk"}
  
  ];

const HealtCheckForm = ( {onSubmit, onCancel, diagnoses}: Props ) => {
 return( 
        <Formik
          initialValues={{
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [""],
            healthCheckRating: healthCheckRating.Healthy,
            type: "HealthCheck"
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
              <SelectField name="healthCheckRating" label="Healthcheck Rating" options={healtCheckRatingOptions} />
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

export default HealtCheckForm;
