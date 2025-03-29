import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/models'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { Usuario } = db
                await db.sequelize.sync()

                const usuario = await Usuario.findOne({ where: { email: credentials.email } })

                if (!usuario) {
                    throw new Error('Usuario no encontrado')
                }

                // Recomendado usar bcrypt aquí en producción
                const esValido = await bcrypt.compare(credentials.password, usuario.password)
                
                if (!esValido) {
                    throw new Error('Contraseña incorrecta')
                }

                return {
                    id: usuario.id,
                    name: usuario.nombre,
                    email: usuario.email,
                    rol: usuario.rolId, // opcional para roles
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    pages: {
        signIn: '/', // Ruta personalizada para login (ajusta a tu ruta de login)
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.rol = user.rol
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.rol = token.rol
            return session
        },
    },
}

export default NextAuth(authOptions)
