import { State } from "./state";
import { Patient } from "../types";



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
    };


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