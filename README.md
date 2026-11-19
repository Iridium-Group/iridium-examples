# Iridium examples

Small runnable programs for each Iridium package. Everything stays on your machine: the proxy
example starts its own server and a local echo service.

| Example                                                         | Shows                                                                      |
| --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`01-config.ts`](examples/01-config.ts)                         | Resolve a config with defaults, an env override and readable errors        |
| [`02-urls-and-headers.ts`](examples/02-urls-and-headers.ts)     | URL, address, CIDR, header and CSP helpers from `utils`                    |
| [`03-memory-transport.ts`](examples/03-memory-transport.ts)     | An in-process echo service over `MemoryTransport`                          |
| [`04-wisp-through-proxy.ts`](examples/04-wisp-through-proxy.ts) | The proxy's Wisp endpoint, with private addresses allowed and then blocked |
| [`05-inspect.ts`](examples/05-inspect.ts)                       | Ask what a config does with a URL, using the inspector as a library        |

## Run

Needs Node 22.18 or later, which runs TypeScript directly.

```sh
npm install
node examples/01-config.ts
```

The packages are installed from GitHub, so the first `npm install` builds them and takes a moment.

## Packages

- [config](https://github.com/Iridium-Group/iridium-config)
- [utils](https://github.com/Iridium-Group/iridium-utils)
- [transport](https://github.com/Iridium-Group/iridium-transport)
- [proxy](https://github.com/Iridium-Group/iridium-proxy)
- [inspector](https://github.com/Iridium-Group/iridium-inspector)

## Development

`npm test` runs every file in `examples/` and fails if one exits non-zero or hangs, so the
examples stay working as the packages change.

## License

MIT
