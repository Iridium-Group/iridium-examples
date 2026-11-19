/**
 * Start the Iridium proxy and a TCP echo server on this machine, then talk to the echo server
 * through the proxy's Wisp endpoint with WispClientTransport. Then show the same request being
 * refused when private addresses are blocked, which is the default.
 *
 *   node examples/04-wisp-through-proxy.ts
 */
import { createServer } from 'node:net';
import { resolveConfig } from '@iridium-group/config';
import { createProxyServer } from '@iridium-group/proxy';
import { TransportError, WispClientTransport } from '@iridium-group/transport';

const echo = createServer((socket) => socket.pipe(socket));
await new Promise<void>((resolve) => echo.listen(0, '127.0.0.1', resolve));
const echoPort = (echo.address() as { port: number }).port;

async function through(blockPrivateAddresses: boolean): Promise<void> {
  const config = resolveConfig(
    {
      server: { host: '127.0.0.1' },
      security: { blockPrivateAddresses },
      logging: { level: 'silent' },
    },
    { env: false },
  );
  const proxy = createProxyServer(config);
  const { port } = await proxy.listen(0);
  const transport = new WispClientTransport({ url: `ws://127.0.0.1:${port}/wisp/` });
  try {
    const conn = await transport.connect({ host: '127.0.0.1', port: echoPort });
    const writer = conn.writable.getWriter();
    const reader = conn.readable.getReader();
    await writer.write(new TextEncoder().encode('hello through the proxy'));
    const { value } = await reader.read();
    console.log(
      `blockPrivateAddresses=${blockPrivateAddresses}: echoed "${new TextDecoder().decode(value)}"`,
    );
    await conn.close();
  } catch (error) {
    if (!(error instanceof TransportError)) throw error;
    console.log(`blockPrivateAddresses=${blockPrivateAddresses}: refused (${error.code})`);
  } finally {
    await transport.close();
    await proxy.close();
  }
}

try {
  await through(false);
  await through(true);
} finally {
  echo.close();
}
