
import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from "@/utils/supabase/client";



const useAuth = () => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const supabase = createClient();

    const LogOut = async () => {

        try {

            const { error } = await supabase.auth.signOut();

            setUser(null);

        } catch (error) {
            console.error(error)
        }

    }


    useEffect(() => {

        const checkSession = async () => {

            try {
                const { data } = await supabase.auth.getSession();

                if (!data) {
                    console.log('Undefined data session')
                    return;
                }

                setUser(data.session?.user ?? null)
                setLoading(false);

            } catch (error) {
                console.error(error);
                setLoading(true);
            }

        }

        checkSession();

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            data.subscription.unsubscribe();
        };

    }, [])

    return { user, loading, LogOut }
}
export default useAuth;