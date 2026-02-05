'use client';

import { useState } from "react";

import { createClient } from "@/utils/supabase/client";
import useAuth from "@/hooks/useAuth";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

//Styles
import "./Login.scss";
import Link from "next/link";


export default function LoginPage() {


    //Settings
    const supabase = createClient();
    const { user, LogOut } = useAuth();

    //States
    const [inputUserEmail, setInputUserEmail] = useState<string>('');
    const [inputUserPass, setInputUserPass] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    // const [errorPass, setErrorPass] = useState<boolean>(false); // Keep this if you plan to use it later, or remove


    const getUserEmail = (value: string) => {

        const emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");

        if (value.length >= 6 && emailRegex.test(value)) {

            setErrorEmail(false);
            setInputUserEmail(value);

        } else {

            setErrorEmail(true);
        }

    }

    const getUserPass = (value: string) => {

        const regExTest = new RegExp("^[a-zA-Z0-9_-]+$");

        if (value.length > 6 && regExTest.test(value)) {

            setInputUserPass(value);

        }

    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email: inputUserEmail,
            password: inputUserPass
        })

        if (error) {
            console.log(error)
            alert(error.message)
            return;
        }

    }


    if (user) {
        return (
            <PageWrapper layout={'login'}>
                <section className="login-form">
                    <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>{"👋 Re-bonjour !"}</h1>
                    <p className="login-status" style={{ textAlign: 'center', marginBottom: '2rem' }}>{"Vous êtes déjà connecté avec"}<br /> <strong>{user.email}</strong></p>

                    <div className="form-group" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>

                        <Link href={"/"} className="btn sign-in-button" style={{ textAlign: 'center' }}>{"Retour à l'accueil"} </Link>

                        <button
                            type="button"
                            onClick={LogOut}
                            className="btn go"
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', textDecoration: 'underline', cursor: 'pointer' }}
                        >
                            Se déconnecter
                        </button>
                    </div>
                </section>
            </PageWrapper>
        )
    }


    return (

        <PageWrapper layout={'login'}>
            <section className="login-form">

                <h1>Se connecter</h1>
                <form id="login" onSubmit={(e) => handleLogin(e)}>

                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input type="email" placeholder="Votre identifiant" id="email" name="email" onChange={(e) => getUserEmail(e.target.value)} />
                    </div>
                    {errorEmail && <p className="error">Veuillez remplir le champ email</p>}
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="*********" onChange={(e) => getUserPass(e.target.value)} />
                    </div>

                    <button className="btn sign-in-button" type="submit">Go Auth</button>
                </form>
            </section>
        </PageWrapper>
    )
}