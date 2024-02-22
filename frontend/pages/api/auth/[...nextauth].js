import NextAuth from "next-auth";
import FacebookProviders from "next-auth/providers/facebook";
import { updateToken } from "../../../api/account";

export default NextAuth({
	providers: [
		FacebookProviders({
			clientId: process.env.APP_ID,
			clientSecret: process.env.APP_SECRET,
		}),
	],
	debug: false && process.env.NODE_ENV === "development",
	callbacks: {
		async signIn({user, account, profile}) {
			console.log(account);
			updateToken(user.email, account.accessToken);
			return true;
		},
		async jwt({token, user, account, profile, isNewUser}) {
			if (account) {
				token.accountId = account.id;
				token.accessToken = account.accessToken;
			}
			return token;
		},
		async session({session, token}) {
			if (token) {
				session.accountId = token.accountId;
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
	session: { jwt: true },
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	database: process.env.MONGO_URI,
});
