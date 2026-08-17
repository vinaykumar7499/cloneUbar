import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import connectDb from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";

// Initialize NextAuth v5 configuration and export authentication helper methods
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure authentication providers
  providers: [
    // Google OAuth Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Email & Password Credentials Provider
    Credentials({
      name: "Credentials",
      // Define input fields shown in default sign-in form
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },

      // Custom verification logic when user submits login credentials
      async authorize(credentials) {
        // Step 1: Validate presence of email and password
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Step 2: Normalize input values
        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        // Step 3: Establish database connection
        await connectDb();

        // Step 4: Find user in MongoDB database
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.password) {
          throw new Error("Password not found");
        }

        // Step 5: Verify hashed password with bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        // Step 6: Return safe user object (excluding sensitive password hash)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],

  // Use JSON Web Tokens for session management
  session: {
    maxAge: 10 * 24 * 60 * 60, // 10 days
    strategy: "jwt",
  },

  callbacks: {
    // 1. signIn Callback: Controls whether a user is allowed to sign in and syncs Google OAuth users with MongoDB
    async signIn({ account, profile, user }) {
      // Jab user Google ke zariye sign in kare
      if (account?.provider === "google") {
        try {
          await connectDb();
          const email = profile?.email || user?.email;
          if (!email) return false;

          let dbUser = await User.findOne({ email });

          // Agar user MongoDB me exist nahi karta toh create karein
          if (!dbUser) {
            dbUser = await User.create({
              name: profile?.name || user.name || "Google User",
              email: email,
              role: "user",
            });
          }

          // User object me MongoDB ki id aur role assign karein
          user.id = dbUser._id.toString();
          user.role = dbUser.role || "user";
          return true;
        } catch (error) {
          console.error("Google signIn callback error:", error);
          return false;
        }
      }

      // Credentials provider ke liye sign-in allow karein
      if (account?.provider === "credentials") {
        return true;
      }

      return true;
    },


    // JWT callback is called whenever a JSON Web Token is created or updated
    async jwt({ token, user, account }) {
      if (user) {
        // Initial sign-in: attach user properties to token payload
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      // Ensure MongoDB user id & role are synced for Google OAuth
      if (account?.provider === "google" && token.email) {
        try {
          await connectDb();
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role || "user";
          }
        } catch (err) {
          console.error("Error syncing Google user in JWT:", err);
        }
      }

      return token;
    },
    // Session callback exposes token properties to client session
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  // Secret key used to encrypt and sign JWT tokens
  secret: process.env.AUTH_SECRET,
});



