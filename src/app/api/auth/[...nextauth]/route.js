import NextAuth from 'next-auth'

const handler = NextAuth({
  providers: [
    // Add your providers here
    // For now, we'll add a basic configuration
  ],
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user }) {
      return token
    },
  },
})

export { handler as GET, handler as POST }