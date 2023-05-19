import { createContext } from "react";
import { AppState, initialAppState } from "./AppState";
import { LoginModel } from "../Model/LoginModels";
export const AppContext = createContext<AppState>(initialAppState);