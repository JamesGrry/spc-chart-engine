#!/usr/bin/env tsx
import { Command } from 'commander';
// import { buildChart } from '../src/index.js';

const program = new Command();
program
  .name('spc-chart-engine')
  .description('Build chart from config')
  .version('0.1.0');

program
  .command('build')
  .argument('<config>', 'Path to JSON config file')
  .option('-o, --output <file>', 'Output file path')
  // .action(buildChart);

program.parse();

// bin/cli.ts
import fs from 'fs';
import { parseConfigObject } from '../src/parser.js';
import { ChartConfig } from '../src/types.js';

function parseConfig(path: string): ChartConfig {
  const raw = fs.readFileSync(path, 'utf-8');
  return parseConfigObject(JSON.parse(raw));
}

