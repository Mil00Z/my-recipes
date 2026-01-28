
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";



const useAuth = () => {

    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const supabase = createClient();


    useEffect(() => {

        const checkSession = async () => {

            try {
                const { data, error } = await supabase.auth.getSession()

                if (!data) {
                    console.log('Undefined data session')
                    return;
                }

                setUser(data.session?.user)
                setLoading(false);

            } catch (error) {
                console.error(error);
                setLoading(true);
            }

        }

        checkSession();

    }, [])

    return { user, loading }
}
export default useAuth;