import jwt from '@tsndr/cloudflare-worker-jwt'

export interface Env {
	JWT_KEY: string;
	FLAG: string;
}

const defaultResponse = async (secretKey: string) => {
	const token = await jwt.sign({ next: 'https://9w345o00.xctf.ryusa.app', u: "guest" }, secretKey, { algorithm: 'HS256' });
	const response = new Response('Error: You are not admin. Please login as admin to see the flag!\n\nWelcome Guest User! Please take a free cookie :)');
	response.headers.append('Set-Cookie', `token=${token}; HttpOnly; SameSite=Strict`);
	return response;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		const secretKey = env.JWT_KEY;

		// get a JWT token from request Cookie header
		const cookie = request.headers.get('Cookie');
		// if cookie does not exist, or is not a JWT token, execute a default response
		if (!cookie) {
			return defaultResponse(secretKey);
		}
		const raw = cookie.split(';').find((c) => c.trim().startsWith('token='));
		if(!raw) {
			return defaultResponse(secretKey);
		}
		// The Cookie may be in the form. 
		// _ga=...; _ga_XXX=...; _ga_FWJ7QB1B0K=...; token=$token
		const token = raw.replace('token=', '').replaceAll(' ', '');
		try {
			const isValid = await jwt.verify(token, secretKey, { algorithm: "HS256", throwError: false });
			if (!isValid) {
				return defaultResponse(secretKey);
			}
		} catch (error) { // this may be the jwt is invalid format, or expired
			return defaultResponse(secretKey);
		}

		const { payload } = await jwt.decode(token);
		if (payload.u === "admin") {
			return new Response(`Welcome Admin User! This is the invitation code ${env.FLAG}! \n Thank you for playing!:)`);
		}
		return defaultResponse(secretKey);
	},
};
