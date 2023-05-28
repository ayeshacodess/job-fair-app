import { LoginModel } from "../Model/LoginModels";

export interface UserProfile {
    Id: number; //user table id
    userProfileId: number; // student table id
    name: string;
    username: string;
    role: string;
    email: string;
    aridNumber: string;
    cgpa: string;
    FypGrade: string;
}

export const initialUserProfile: UserProfile = {
    aridNumber: "",
    userProfileId: 0,
    name: "",
    cgpa: "",
    email: "",
    Id: 0,
    role: "",
    username: "",
    FypGrade: ""
}

export interface AppState {
    isLoggedIn: boolean,
    isLoginPending: boolean,
    loginError?: string,
    userProfile: UserProfile,
    login?: (param: LoginModel) => void,
    logout?: () => void,
}

export const initialAppState: AppState = {
    isLoggedIn: false,
    isLoginPending: false,
    loginError: undefined,
    userProfile: initialUserProfile,
}



