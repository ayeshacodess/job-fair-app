import { LoginModel } from "../Model/LoginModels";

export interface UserProfile {
    Id: number;
    name: string;
    username: string;
    role: string;
    email: string;
    aridNumber: string;
    cgpa: string;
}

export const initialUserProfile: UserProfile = {
    aridNumber: "",
    name: "",
    cgpa: "",
    email: "",
    Id: 0,
    role: "",
    username: ""
}

export interface AppState {
    isLoggedIn: boolean,
    isLoginPending: boolean,
    loginError?: string,
    userProfile: UserProfile,
    login?: (param: LoginModel) => void,
    logout?: () => void,
}

export const initialState: AppState = {
    isLoggedIn: false,
    isLoginPending: false,
    loginError: undefined,
    userProfile: initialUserProfile,
}



