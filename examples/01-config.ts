/**
 * Resolve a config from an object, with an environment override on top.
 *
 *   node examples/01-config.ts
 */
import { ConfigError, defineConfig, resolveConfig } from '@iridium-group/config';

const input = defineConfig({
  server: { port: 3000, staticDir: 'public' },
  transport: { type: 'wisp', url: 'wss://proxy.example.com/wisp/' },
});

const config = resolveConfig(input, { env: { IRIDIUM_LOGGING__LEVEL: 'debug' } });
console.log(`server on port ${config.server.port}, log level ${config.logging.level}`);
console.log(`blocked ports: ${config.security.blockedPorts.join(', ')}`);

try {
  resolveConfig({ server: { port: 70000 }, logging: { level: 'loud' } }, { env: false });
} catch (error) {
  if (error instanceof ConfigError) console.log(`\n${error.message}`);
  else throw error;
}
