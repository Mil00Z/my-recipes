'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

//Styles
import "./Login.scss";


export default function LoginPage() {

    //Settings
    const router = useRouter();
    const supabase = createClient();

    //States
    const [inputUserEmail, setInputUserEmail] = useState<string>('');
    const [inputUserPass, setInputUserPass] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    // const [errorPass, setErrorPass] = useState<boolean>(false);

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
        } else {
            console.log('success')
            setTimeout(() => {

                router.push('/recipes/50');

            }, 3000)
        }

    }


    return (

        <PageWrapper>
            <section className="login-form">

                <h1><i className="fa fa-user-circle sign-in-icon"></i> LogIn</h1>
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