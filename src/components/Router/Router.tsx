import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import LoginSection from "../Login/LoginSection";
import Header from "../Header/Header";
import MailSignup from "../../mailSignup/MailSignup";
import SectionGenerateImage from "../generatorPost/SectionGenerateImage";
import { AuthProvider } from "../Context/AuthContext";
import Settings from "../Settings/Settings";
import { CreditProvider } from "../Context/CreditContext";

type ToggleSigninSignup = "SIGNIN" | "SIGNUP" | "LOGIN";

const getInitialToggleSigninSignup = (): ToggleSigninSignup => {
  return window.location.hash === "#/login" ? "SIGNIN" : "LOGIN";
};

const Router: React.FC = () => {
  const [toggleSigninSignup, setToggleSigninSignup] =
    useState<ToggleSigninSignup>(getInitialToggleSigninSignup);

  return (
    <>
      <HashRouter>
        <AuthProvider>
          <CreditProvider>
            <Header
              toggleSigninSignup={toggleSigninSignup}
              setToggleSigninSignup={setToggleSigninSignup}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <LoginSection
                    toggleSigninSignup={toggleSigninSignup}
                    setToggleSigninSignup={setToggleSigninSignup}
                  />
                }
              />
              <Route path="/login/email-signup" element={<MailSignup />} />
              <Route
                path="/generate-image"
                element={<SectionGenerateImage />}
              />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </CreditProvider>
        </AuthProvider>
      </HashRouter>
    </>
  );
};

export default Router;
