import { createContext } from "react";
import { AppState, initialState } from "./AppState";
import { LoginModel } from "../Model/LoginModels";
export const AppContext = createContext<AppState>(initialState);