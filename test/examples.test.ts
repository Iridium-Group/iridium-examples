import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { describe, it } from 'node:test';

const files = readdirSync('examples')
  .filter((f) => f.endsWith('.ts'))
  .sort();

describe('examples', () => {
  it('has examples to run', () => assert.ok(files.length >= 5));
  for (const file of files) {
    it(`${file} exits 0 and prints something`, () => {
      const result = spawnSync(process.execPath, [`examples/${file}`], {
        encoding: 'utf8',
        timeout: 30_000,
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      assert.equal(result.status, 0, result.stderr);
      assert.ok(result.stdout.length > 0);
    });
  }
});
