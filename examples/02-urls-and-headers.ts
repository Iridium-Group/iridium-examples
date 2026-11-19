/**
 * URL, address and header helpers from @iridium-group/utils.
 *
 *   node examples/02-urls-and-headers.ts
 */
import {
  addCspSource,
  isPrivateAddress,
  normalizeUrl,
  parseCidr,
  redactUrlCredentials,
  removeCspDirectives,
  splitHostPort,
  stripHopByHopHeaders,
  isInCidr,
} from '@iridium-group/utils';

console.log(normalizeUrl('HTTP://Example.COM:80/a/../b?x=1#frag'));
console.log(redactUrlCredentials('https://user:secret@example.com/path'));
console.log(splitHostPort('[2001:db8::1]:8080'));

for (const ip of ['8.8.8.8', '10.1.2.3', '127.0.0.1', '::1', '2001:db8::1']) {
  console.log(`${ip} private: ${isPrivateAddress(ip)}`);
}
console.log(
  '192.168.1.5 in 192.168.0.0/16:',
  isInCidr('192.168.1.5', parseCidr('192.168.0.0/16')!),
);

console.log(stripHopByHopHeaders({ Connection: 'close', 'Keep-Alive': 'x', Accept: '*/*' }));

let csp = "default-src 'self'; frame-ancestors 'none'; script-src 'self'";
csp = removeCspDirectives(csp, ['frame-ancestors']);
csp = addCspSource(csp, 'script-src', 'https://cdn.example.com');
console.log(csp);
