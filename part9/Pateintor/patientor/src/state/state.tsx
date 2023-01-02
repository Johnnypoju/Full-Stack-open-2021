import React, { createContext, useContext, useReducer } from "react";
import { Gender, Patient, Diagnoses } from "../types";


export type State = {
  patients: { [id: string]: Patient };
  patient: Patient;
  diagnoses: Diagnoses[]
};

const initialState: State = {
  patients: {},
  patient: { 
    id: "",
    name: "",
    occupation: "",
    gender: Gender["Male"],
    entries: []
  },
  diagnoses: []
};

export const StateContext = createContext<[State, React.Dispatch<any>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, any>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
