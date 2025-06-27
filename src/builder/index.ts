import { ChartConfig, EChartsOption } from '../types.js';
import { buildXbarOption } from './xbar.js';
// 如果你有更多图表类型，可继续导入如：
// import { buildROption } from './r.js';

type ChartBuilder = (config: ChartConfig) => EChartsOption;

const builderMap: Record<string, ChartBuilder> = {};

// 注册所有支持的图表类型
export function registerChartType(type: string, builder: ChartBuilder) {
  builderMap[type] = builder;
}

// 默认注册内置图表类型
registerChartType('xbar', buildXbarOption);
// registerChartType('r', buildROption); // 示例

// 主调用接口
export function buildOption(config: ChartConfig): EChartsOption {
  const type = config.type;

  if (!type) {
    throw new Error('[builder] 配置缺少 type 字段');
  }

  const builder = builderMap[type];
  if (!builder) {
    throw new Error(`[builder] 未注册的图表类型: ${type}`);
  }

  const option = builder(config);
  return option;
}
