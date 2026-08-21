import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceUrl = new URL('../therarbg-modern-theme.user.js', import.meta.url);
const source = await readFile(sourceUrl, 'utf8');

function metadataValues(name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return [...source.matchAll(new RegExp(`^// @${escapedName}\\s+(.+)$`, 'gm'))].map(
    ([, value]) => value.trim(),
  );
}

test('userscript metadata is safe and release-ready', () => {
  assert.deepEqual(metadataValues('version'), ['0.1.5']);
  assert.deepEqual(metadataValues('grant'), ['none']);
  assert.deepEqual(metadataValues('match'), [
    'https://therarbg.com/',
    'https://therarbg.com/get-posts*',
    'https://therarbg.com/catalog*',
  ]);
  assert.deepEqual(metadataValues('require'), []);
  assert.deepEqual(metadataValues('connect'), []);

  const expectedSourceUrl =
    'https://raw.githubusercontent.com/Ci303/therarbg-modern-theme/main/therarbg-modern-theme.user.js';
  assert.deepEqual(metadataValues('updateURL'), [expectedSourceUrl]);
  assert.deepEqual(metadataValues('downloadURL'), [expectedSourceUrl]);
});

test('userscript remains presentation-only', () => {
  const disallowedCapabilities = [
    /\bfetch\s*\(/,
    /\bXMLHttpRequest\b/,
    /\bWebSocket\b/,
    /\bunsafeWindow\b/,
    /\bGM_[A-Za-z0-9_]+\b/,
    /\beval\s*\(/,
    /\bnew\s+Function\s*\(/,
  ];

  for (const pattern of disallowedCapabilities) {
    assert.doesNotMatch(source, pattern);
  }
});

test('all palette choices are unique and have CSS definitions', () => {
  const optionsBlock = source.match(/const PALETTE_OPTIONS = \[([\s\S]*?)\n  \];/);
  assert.ok(optionsBlock, 'PALETTE_OPTIONS was not found');

  const options = [...optionsBlock[1].matchAll(/\['([^']+)',\s*'([^']+)'\]/g)].map(
    ([, value, label]) => ({ value, label }),
  );
  assert.equal(options.length, 12);
  assert.equal(new Set(options.map(({ value }) => value)).size, options.length);
  assert.equal(new Set(options.map(({ label }) => label)).size, options.length);

  for (const { value } of options) {
    if (value === 'midnight') continue;
    assert.match(source, new RegExp(`data-tm-rarbg-palette="${value}"`));
  }
});

test('every referenced theme variable is declared', () => {
  const declarations = new Set([...source.matchAll(/(--tm-[a-z0-9-]+)\s*:/g)].map(([, name]) => name));
  const references = new Set([...source.matchAll(/var\((--tm-[a-z0-9-]+)\)/g)].map(([, name]) => name));

  assert.ok(declarations.size > 30, 'Unexpectedly few theme variables were found');
  assert.deepEqual([...references].filter((name) => !declarations.has(name)), []);
});
