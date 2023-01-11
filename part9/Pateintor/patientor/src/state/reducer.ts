import { State } from "./state";
import { Patient, Diagnoses } from "../types";



export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |  {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnoses[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry
  }  
  ;


export const reducer = (state: State, action: Action): State => {
  
  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log("SET_PATIENT_LIST");
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      console.log("ADD_PATIENT");
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      console.log("SET_PATIENT");
      return {
        ...state,
        patient: {
          id: action.payload.id,
          name: action.payload.name,
          occupation: action.payload.occupation,
          gender: action.payload.gender,
          ssn: action.payload.ssn,
          dateOfBirth: action.payload.dateOfBirth,
          entries: action.payload.entries
        }
      };
    case "SET_DIAGNOSES": 
      console.log("SET_DIAGNOSES");
        return {
          ...state,
          diagnoses : action.payload.map((diagnosis) => {
            return {
              code: diagnosis.code,
              name: diagnosis.name,
              latin: diagnosis.latin
            };
          })
    
          };

    case "ADD_ENTRY":
    default:
      return state;
  }
};


export const setPatientList = (content: Patient[]) => {
  return {
  type: "SET_PATIENT_LIST",
  payload: content
  };
};

export const addPatient = (content: Patient) => {
  return {
  type: "ADD_PATIENT",
  payload: content
};
};

export const setPatient = (content: Patient) => {
  return {
  type: "SET_PATIENT",
  payload: content
  };
};

export const setDiagnoses = (content: Diagnoses[]) => {
  return {
    type: "SET_DIAGNOSES",
    payload: content
  };
};