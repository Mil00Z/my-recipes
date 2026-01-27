'use client';

import { useState } from "react";

import PageWrapper from "@/components/PageWrapper/PageWrapper";

//Styles
import "./Login.scss";


export default function LoginPage() {

    const [inputUserEmail, setInputUserEmail] = useState('');
    const [inputUserPass, setInputUserPass] = useState();

    //      const getUserEmail = (value) => {

    //     let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");

    //     if (value.length > 6 && emailRegex.test(value)) {

    //       setInputUserEmail(value);

    //     }

    //   }

    //   const getUserPass = (value) => {

    //     let regExTest = new RegExp("^[a-zA-Z0-9_-]+$");

    //     if(value.length > 6 && regExTest.test(value)) {

    //       setInputUserPass(value);

    //     } 



    return (

        <PageWrapper>
            <section className="login-form">

                <h1><i className="fa fa-user-circle sign-in-icon"></i> LogIn</h1>
                <form id="login">

                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input type="email" placeholder="Votre identifiant" id="email" name="email" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="*********" />
                    </div>

                    <button className="btn sign-in-button" type="submit">Go Auth</button>

                </form>
            </section>
        </PageWrapper>
    )
}