import type { Plugin } from '../plugin.js';

export const anomalyDetectorPlugin: Plugin = {
  name: 'anomalyDetector',

  apply(hook, config, option) {
    if (hook !== 'onBuild') return;
    if (!option?.series?.[0]?.data) return;

    const series = option.series[0];
    const data = series.data as number[];

    if (data.length < 2) return;

    // 1. 中位数
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];

    // 2. 计算每个点到中位数的绝对偏差
    const absDeviations = data.map(v => Math.abs(v - median));

    // 3. MAD（中位数绝对偏差）
    const sortedDevs = [...absDeviations].sort((a, b) => a - b);
    const mad = sortedDevs.length % 2 === 0
      ? (sortedDevs[mid - 1] + sortedDevs[mid]) / 2
      : sortedDevs[mid];

    // 4. 阈值（可配置，默认 3）
    const scale = config.threshold ?? 3;
    const threshold = scale * mad;

    console.log('[MAD] 中位数:', median.toFixed(2));
    console.log('[MAD] 偏差:', mad.toFixed(2));
    console.log('[MAD] 阈值:', threshold.toFixed(2));

    series.data = data.map((v, i) => {
      const dev = Math.abs(v - median);
      if (dev > threshold) {
        console.log(`[Anomaly-MAD] index ${i}: ${v} (Δ${dev.toFixed(2)})`);
        return {
          value: v,
          itemStyle: { color: 'red' }
        };
      }
      return v;
    });
  }
};
