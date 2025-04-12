import NextAuth from "next-auth"
import FACEIT from "next-auth/providers/faceit"

const faceitClientId = process.env.FACEIT_CLIENT_ID
const faceitClientSecret = process.env.FACEIT_CLIENT_SECRET

if (!faceitClientId || !faceitClientSecret) {
    console.error('Invalid faceit client credentials.')
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [FACEIT({
        authorization: {
            url: 'https://accounts.faceit.com/accounts',
            params: { scope: "openid", redirect_popup: true },
        },
        issuer: 'https://api.faceit.com/auth',
        token: 'https://api.faceit.com/auth/v1/oauth/token',
        userinfo: 'https://api.faceit.com/auth/v1/resources/userinfo',
        jwks_endpoint: 'https://api.faceit.com/auth/v1/oauth/certs',
        clientId: faceitClientId,
        clientSecret: faceitClientSecret,
    })],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account?.provider === "faceit" && profile) {
                token.faceitId = profile.guid;
                token.nickname = profile.nickname;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.faceitId as string;
                session.user.name = token.nickname as string;
            }
            return session;
        },
    }
})