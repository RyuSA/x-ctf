Welcome to Cookie.
===

This component is the entry point for x-ryusa-ctf, where everything on this site originates.

When players access this component without any configurations, they receive an HTTP message indicating they are recognized as Guest users. Players then need to gather certain information from this point to collect details leading to the flag.

## Usage

```bash
# Install dependencies
$ npm install
# Start the development server
$ npm run start
# Build the project
$ npm run build
```

## Write-up
This component is designed with two primary goals in mind.

### Understanding HTTP Headers/Cookies
By inspecting the HTTP response headers returned from the component, we observe the following headers:

```bash
$ curl http://127.0.0.1:8787 --include 
HTTP/1.1 200 OK
Content-Length: 114
Content-Type: text/plain;charset=UTF-8
Set-Cookie: token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuZXh0IjoiaHR0cHM6Ly85dzM0NW8wMC54Y3RmLnJ5dXNhLmFwcCIsInUiOiJndWVzdCIsImlhdCI6MTY5ODMyMjc4NH0.wEbbXV-N9hyn0E1IVjkb7fNIUG4hCFQ_jnAWQfsM2J4; HttpOnly; SameSite=Strict

Error: You are not an admin. Please log in as an admin to view the flag!

Welcome, Guest User! Please enjoy a free cookie :)
```

From the response body, it's evident that there's an Admin user on this site. Furthermore, the presence of a `token` cookie in the Set-Cookie header suggests that one might be able to see the flag if accessing with the Admin user's cookie. In this CTF, the objective is to obtain or retrieve this Admin user's cookie.

### Decoding the JWT
Examining the `token` value returned from the component, players notice it follows this format:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuZXh0IjoiaHR0cHM6Ly85dzM0NW8wMC54Y3RmLnJ5dXNhLmFwcCIsInUiOiJndWVzdCIsImlhdCI6MTY9ODMyMjc4NH0.wEbbXV-N9hyn0E1IVjkb7fNIUG4hCFQ_jnAWQfsM2J4
```

This follows the JWT (JSON Web Token) format, which is a payload signed with a secret key. Decoding this token gives the following JSON structure. By the way, players can conveniently decode JWTs at [https://jwt.io](https://jwt.io):

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
{
  "next": "http...",
  "u": "guest"
}
```

If players obtain the secret key, players can sign the payload with `u=admin`, allowing players to create the Admin user's cookie. Unfortunately, players can't get the secret key at this stage. Therefore, players need to follow the `next` URL present in the payload to access the next component.
