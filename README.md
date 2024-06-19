x-ryusa-ctf
===

Visit the entrypoint. [https://root.xctf.ryusa.app/](https://root.xctf.ryusa.app/)

## Write up
1. [Welcome Cookie](./welcome-cookie/README.md)
2. [301 Moved Permanently?](./301-redirect/README.md)
3. [You cannot see this page.](./operational-error/README.md)
4. [Prompting...](./prompting/README.md)

## Development

These tools are required to run/build the project.

- Node.js v20.8.x
- npm 9.8.x
- wrangler 3.14.x
- Docker

Also, this repository supports devcontainer. If you use VSCode, you can develop this project inside of a container.

### Generate Documentation

To support `mkdocs`, you can generate `docs` with the script `scripts/generate-docs.sh`. Then you will see `docs` directory, and `techdocs-cli generate --no-docker` creates a website for Backstage.
