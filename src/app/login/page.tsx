'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

import { createClient } from "@/utils/supabase/client";
import useAuth from "@/hooks/useAuth";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
// import FeedbackBlock from "@/components/FeedbackBlock/FeedbackBlock";

//Styles
import "./Login.scss";



export default function LoginPage() {

    const REDIRECT_DELAY_SECONDS : number = 4;

    //Settings
    const supabase = createClient();
    const { user } = useAuth();
    const router = useRouter(); // Initialize useRouter

    //States
    const [inputUserEmail, setInputUserEmail] = useState<string>('');
    const [inputUserPass, setInputUserPass] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    // const [errorPass, setErrorPass] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(REDIRECT_DELAY_SECONDS); 


    useEffect(() => {
        if (user) {

            const timer = setTimeout(() => {
                router.push('/'); 
            }, REDIRECT_DELAY_SECONDS * 1000);

    
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            // Cleanup
            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); 



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

                <section className={`login-form is-ok`}>
                    <h1>👋 Hey Salut!</h1>

                    <p className="logged-in-message">
                        Vous êtes identifié en tant que <br />
                        <strong>{user.email}</strong>
                    </p>
                     <p className="logged-in-message">
                        Redirection automatique dans <span className="count">{countdown}</span> secondes...
                    </p>

                    <div className="redirect">
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
                            placeholder="chef@cuisine.com"
                            id="email"
                            name="email"
                            onChange={(e) => getUserEmail(e.target.value)}
                            onBlur={handleBlurEmail}
                            required

                        />
                        {errorEmail && <p className="error">Veuillez remplir le champ email correctement</p>}
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password"
                            id="password"
                            name="password"
                            placeholder="*********"
                            onChange={(e) => getUserPass(e.target.value)}
                            required />
                    </div>

                    <button className="btn go" type="submit">Se connecter</button>
                </form>
            </section>
        </PageWrapper>
    )
}