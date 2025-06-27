// import fs from 'fs';
// import path from 'path';

// export function parseConfig(configPath: string): any {
//   const raw = fs.readFileSync(path.resolve(configPath), 'utf-8');
//   const config = JSON.parse(raw);

//   const defaults = {
//     min: 0,
//     max: 100,
//     title: 'SPC 控制图'
//   };

//   return { ...defaults, ...config };
// }


// src/parser.ts
import type { ChartConfig } from './types.js';

export function parseConfigObject(raw: any): ChartConfig {
  // 可加入校验和默认字段合并
  return raw;
}
