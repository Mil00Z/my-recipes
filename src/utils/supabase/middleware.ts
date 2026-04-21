import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 1. Si Connecté -> Interdire l'accès à /login (Redirection Home)
    // Exception: Ignorer les requêtes _next (hot-reload en développement)
    if (user && request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.includes('_next')) {
        console.log(request.nextUrl);
        const url = request.nextUrl.clone()

        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    // 2. Définition des Routes Protégées
    const protectedPaths = ['/create', '/testing']
    const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))
        || request.nextUrl.pathname.includes('/edit') // Pour /recipes/X/edit

    // 3. Si PAS Connecté ET Route Protégée -> Redirection Login
    if (!user && isProtected) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
