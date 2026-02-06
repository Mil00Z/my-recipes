'use client';

import { useState } from "react";
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";
import useAuth from "@/hooks/useAuth";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FeedbackBlock from "@/components/FeedbackBlock/FeedbackBlock";

//Styles
import "./Login.scss";



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

        setInputUserEmail(value);

        if (errorEmail) setErrorEmail(false);

    }

    const getUserPass = (value: string) => {

        const regExTest = new RegExp("^[a-zA-Z0-9_-]+$");

        if (value.length > 6 && regExTest.test(value)) {

            setInputUserPass(value);

        }

    }

    const handleBlurEmail = () => {

        const emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");

        if (inputUserEmail.length >= 6 && emailRegex.test(inputUserEmail)) {

            setErrorEmail(false);

        } else {

            setErrorEmail(true);
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

                {/* <FeedbackBlock
                    type="success"
                    message="Hey Salut !"
                    content={`Vous êtes connecté en tant que ${user.email}`}
                    actionLink="/"
                    actionLabel="Voir les recettes"
                /> */}
                <section className={`login-form is-ok`}>
                    <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>👋 Hey Salut!</h1>

                    <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
                        Vous êtes identifié en tant que <br />
                        <strong>{user.email}</strong>
                    </p>

                    {/* Juste le bouton de retour, centré et pas trop large */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href="/" className="btn btn-primary">
                            Retour aux fourneaux 🥘
                        </Link>
                    </div>
                </section>
            </PageWrapper>
        )
    }


    return (

        <PageWrapper layout={'login'}>
            <section className="login-form">

                <h1>Se connecter</h1>
                <form className="login" onSubmit={(e) => handleLogin(e)}>

                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            placeholder="Votre identifiant"
                            id="email"
                            name="email"
                            onChange={(e) => getUserEmail(e.target.value)}
                            onBlur={handleBlurEmail}
                            required

                        />
                        {errorEmail && <p className="error">Veuillez remplir le champ email correctement</p>}
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id="password"
                            name="password"
                            placeholder="*********"
                            onChange={(e) => getUserPass(e.target.value)}
                            required />
                    </div>

                    <button className="btn sign-in-button" type="submit">Go Auth</button>
                </form>
            </section>
        </PageWrapper>
    )
}