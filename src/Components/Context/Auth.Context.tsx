import React, { useState } from "react";
import { AppState, UserProfile, initialAppState, initialUserProfile } from "./AppState";
import { LoginModel } from "../Model/LoginModels";
import { getData } from "../Helper/httpClient";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router";
//var navigate = useNavigate();

const ContextProvider = (props: any) => {

    const login = (param: LoginModel) => {
        setLoginPending(false);
        setLoginSuccess(true);
        setLoginError("");
        fetchLogin(param, onSuccess, onError);
    }
  
    const logout = () => {
        setLoginPending(false);
        setLoginSuccess(false);
        setLoginError("");
        setUserProfile(initialUserProfile);
    }

    const temp = Object.assign({}, initialAppState, {login, logout});

    const [appState, setAppState] = useState(temp);
  
    const setUserProfile = (userProfile: UserProfile) => 
        setAppState(Object.assign({}, appState, {userProfile}));

    const setLoginPending = (isLoginPending: boolean) => 
        setAppState(Object.assign({}, appState, {isLoginPending}));

    const setLoginSuccess = (isLoggedIn: boolean) => 
        setAppState(Object.assign({}, appState, {isLoggedIn}));

    const setLoginError = (loginError: string) => 
    setAppState(Object.assign({}, appState, {loginError}));
  
    const onError = () => {
        setLoginPending(false);
        setLoginSuccess(false);
        setLoginError("Something went wrong");
    }

    const onSuccess = (user: UserProfile) => {
        setAppState(Object.assign({}, appState, {userProfile: user, isLoggedIn: true, isLoginPending: false})); 
    }
  
    return (
        <AppContext.Provider value={appState}>
            {props.children}
        </AppContext.Provider>
    );
};
  
export default ContextProvider;


const fetchLogin = async (params: LoginModel, onSuccess: Function, onError: Function) => {
    var userData = await getData<UserProfile>("https://localhost:44309/api/account/login", params);
    
    if (userData) {
        onSuccess(userData);
    } else {
        onError();
    }
};