// import { parseConfig } from './parser.js';
import { buildOption } from './builder/index.js';
import { applyPlugins, registerPlugin } from './plugin.js';
// import { writeOutput } from './output.js';
import { anomalyDetectorPlugin } from './plugins/anomalyDetector.js';
import { spcRulePlugin } from './plugins/spcRulePlugin.js';
import type { ChartConfig } from './types.js';

registerPlugin(anomalyDetectorPlugin);
registerPlugin(spcRulePlugin);
// export async function buildChart(configPath: string, options: { output?: string }) {
//   const config = parseConfig(configPath);
//   applyPlugins('onParse', config, null);
//   const option = buildOption(config);
//   applyPlugins('onBuild', config, option);

//   await writeOutput(option, options.output);
//   applyPlugins('onRender', config, option);
// }

/**
 * 用于在浏览器/应用项目中直接构建图表配置（非 CLI）
 */
export  function buildChartFromObject(config: ChartConfig) {
  applyPlugins('onParse', config, null);
  const option = buildOption(config);
  applyPlugins('onBuild', config, option);
  applyPlugins('onRender', config, option);
  return option;
}
