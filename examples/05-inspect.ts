/**
 * Ask what a config does with a URL, using @iridium-group/inspector as a library.
 * The same checks are available on the command line: `npx iridium-inspect url <url>`.
 *
 *   node examples/05-inspect.ts
 */
import { applyDefaults } from '@iridium-group/config';
import { checkUrl, renderUrl } from '@iridium-group/inspector';

const config = applyDefaults({ security: { allowedPorts: [80, 443, 8080] } });

for (const url of [
  'https://example.com/',
  'http://example.com:25/',
  'http://192.168.0.10/',
  'https://user:pw@example.com:9999/',
  'ftp://example.com/',
]) {
  console.log(renderUrl(checkUrl(url, config)));
}
