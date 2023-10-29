operational error
===

Upon accessing this component, players are greeted with an alert saying "You cannot see this page. Something is wrong." It appears that users are not supposed to be able to view this site.

It seems that the work logs from when the server was deployed are publicly available on this page. Use these work logs to search for the URL of the next challenge.

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

Looking through the work logs, this particular behavior seems suspicious:


```
node ➜ /workspaces/x-ryusa-ctf (main) $ ./flarectl dns create --zone ryusa.app --name nexthop.xctf --type TXT --content $NEXT_PAGE
```

It appears that DNS settings are being configured for the `ryusa.app` zone. The variable (`$NEXT_PAGE`), which presumably points to the next challenge, seems to be set to `nexthop.xctf`. Typically, such settings are made using CNAME records, but according to the command, it seems to have been set using a TXT record.

When you actually check the TXT record, you can find the URL of the next challenge:

```
$ dig TXT nexthop.xctf.ryusa.app

; <<>> DiG 9.16.1-Ubuntu <<>> TXT nexthop.xctf.ryusa.app
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 35957
;; flags: qr rd ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;nexthop.xctf.ryusa.app.                IN      TXT

;; ANSWER SECTION:
nexthop.xctf.ryusa.app. 0       IN      TXT     "xxxx.xctf.ryusa.app"
```

Use the URL provided in the TXT record to move on to the next challenge.
