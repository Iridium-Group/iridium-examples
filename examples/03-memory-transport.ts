/**
 * An in-process echo service over MemoryTransport. No network needed.
 *
 *   node examples/03-memory-transport.ts
 */
import { MemoryTransport, echoHandler } from '@iridium-group/transport';

const transport = new MemoryTransport();
transport.listen('echo.internal', 7, echoHandler);

const conn = await transport.connect({ host: 'echo.internal', port: 7 });
const writer = conn.writable.getWriter();
const reader = conn.readable.getReader();
const decoder = new TextDecoder();

for (const message of ['first', 'second', 'third']) {
  await writer.write(new TextEncoder().encode(message));
  const { value } = await reader.read();
  console.log(`sent "${message}", got back "${decoder.decode(value)}"`);
}

await transport.close();
