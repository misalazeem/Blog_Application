import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const authOptions: AuthOptions = ({
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          try {
            const res = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                body: JSON.stringify({
                  username: credentials?.username,
                  password: credentials?.password
                }),
                headers: { "Content-Type": "application/json" }
              })
              const user = await res.json()
              if (res.ok && user) {
                return user
              }
              return null
          } catch (err) {
            throw new Error('Next Auth - Authorize: Authentication error');
          }

        }
      })
  ],

  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
});