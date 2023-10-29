export interface Env {
	LOCATION: string;
}

// return 301 redirect, but the Location header is misspelled with "Locotion".
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// The body is a usual "301 Moved Permanently" HTML page.
		const body = `<!DOCTYPE html>
<html>
<head>
<title>Moved Permanently</title>
</head>
<body>
<h1>Moved Permanently</h1>
<p>The document has moved to...where?</p>
</body>
</html>
`;
		return new Response(body, {
			status: 301,
			statusText: 'Moved Permanently',
			headers: {
				"Content-Type": 'text/html; charset=UTF-8',
				Locotion: env.LOCATION, // misspelled
			},
		});
	},
};
