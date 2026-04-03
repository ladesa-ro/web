#!/usr/bin/env node

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '..', 'openapi-spec.json');

const sources = [
  'http://localhost:3701/api/docs/openapi.v3.json',
  'https://dev.ladesa.com.br/api/v1/docs/openapi.v3.json',
];

let spec = null;

for (const url of sources) {
  try {
    console.log(`Trying: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`  -> ${response.status} ${response.statusText}, skipping`);
      continue;
    }

    spec = await response.json();
    console.log(`  -> OK`);
    break;
  } catch (err) {
    console.warn(`  -> ${err.message}, skipping`);
  }
}

if (!spec) {
  console.error('Failed to fetch OpenAPI spec from all sources');
  process.exit(1);
}

delete spec.servers;

if (
  typeof spec !== 'object' ||
  spec === null ||
  Array.isArray(spec) ||
  typeof spec.openapi !== 'string' ||
  !spec.openapi.startsWith('3.') ||
  typeof spec.info !== 'object' ||
  typeof spec.paths !== 'object'
) {
  console.error('Fetched data is not a valid OpenAPI v3 spec');
  process.exit(1);
}

writeFileSync(outputPath, JSON.stringify(spec, null, 2));
console.log(`Spec saved to: ${outputPath} (servers stripped)`);
