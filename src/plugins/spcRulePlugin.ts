import type { Plugin } from '../plugin.js';

export const spcRulePlugin: Plugin = {
  name: 'spcRules',

  apply(hook, config, option) {
    if (hook !== 'onBuild') return;
    const rules = config.rules || [];

    const series = option.series?.[0];
    const data = series?.data;
    if (!Array.isArray(data)) return;

    // helper: 获取数值
    const getVal = (v: any): number =>
      typeof v === 'object' && v !== null ? v.value : v;

    // Rule: trend（连续上升3个点）
    if (rules.includes('trend')) {
      for (let i = 2; i < data.length; i++) {
        const v1 = getVal(data[i - 2]);
        const v2 = getVal(data[i - 1]);
        const v3 = getVal(data[i]);
        if (v1 < v2 && v2 < v3) {
          const mark = { borderColor: 'orange', borderWidth: 2 };
          if (typeof data[i] === 'number') {
            data[i] = { value: v3, itemStyle: mark };
          } else {
            data[i].itemStyle = { ...(data[i].itemStyle || {}), ...mark };
          }
        }
      }
    }

    // Rule: above3σ（静态阈值，示例用）
    if (rules.includes('above3σ')) {
      const avg = 80;
      const std = 20;
      const threshold = avg + 3 * std;

      series.data = data.map(v => {
        const val = getVal(v);
        return val > threshold
          ? { value: val, itemStyle: { color: '#f00' } }
          : v;
      });
    }
  }
};
