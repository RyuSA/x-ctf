301 Moved Permanently?
===

When players access this component, they are presented with a "301 Moved Permanently" message, but no actual redirection occurs. Players need to find a way to retrieve the URL of the next page and proceed to the subsequent challenge.

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
In this component, it is crucial to understand the behavior of the HTTP status code 301, which signifies a redirection. Typically, when a 301 status code is returned, the HTTP response includes the URL of the new location, prompting browsers to automatically redirect to it.

Upon accessing this component, you receive the following response:

```
$ curl http://localhost:8787/ -v
*   Trying 127.0.0.1:8787...
* Connected to localhost (127.0.0.1) port 8787 (#0)
> GET / HTTP/1.1
> Host: localhost:8787
> User-Agent: curl/7.74.0
> Accept: */*
> 
< HTTP/1.1 301 Moved Permanently
< Content-Length: 163
< Content-Type: text/html; charset=UTF-8
< Locotion: https://sljdhfa.xctf.ryusa.app
< 
<!DOCTYPE html>
<html>
<head>
<title>Moved Permanently</title>
</head>
<body>
<h1>Moved Permanently</h1>
<p>The document has moved to...where?</p>
</body>
</html>
```

According to the HTTP status 301 specification, the "Location" header in the HTTP response defines the URL to which a browser should redirect. However, this response lacks the "Location" header. Instead, it includes a similarly named header, "Locotion," indicating a likely implementation mistake preventing the redirection.

The URL value in the "Locotion" header should be used as the destination for the next component.
