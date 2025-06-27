import { ChartConfig, EChartsOption } from '../types.js';

export function buildXbarOption(config: ChartConfig): EChartsOption {
    // ===== 1. 读取原始数据 =====
    let seriesData: (number | object)[] = Array.isArray(config.data) ? config.data : [];

    if (seriesData.length === 0) {
        console.warn('[xbar] ⚠️ 警告：config.data 未提供，输出空图表');
    }

    // ===== 2. 降采样处理 =====
    if (config.performance?.downsample && config.performance.maxPoints) {
        const max = config.performance.maxPoints;
        const step = Math.ceil(seriesData.length / max);
        const sampled = seriesData.filter((_, i) => i % step === 0);
        console.log(`[xbar] 降采样处理: 原始 ${seriesData.length} → ${sampled.length}`);
        seriesData = sampled;
    }

    // ===== 3. 自动轴策略处理（如 auto-round）=====
    let yMin = config.min;
    let yMax = config.max;

    if (config.axisPolicy === 'auto-round' && typeof config.min === 'number' && typeof config.max === 'number') {
        const range = config.max - config.min;
        const padding = range * 0.05;
        yMin = Math.floor(config.min - padding);
        yMax = Math.ceil(config.max + padding);
        console.log(`[xbar] Y 轴自动对齐范围: ${yMin} ~ ${yMax}`);
    }

    // ===== 4. 构建图表 option =====
    const option: EChartsOption = {
        title: {
            text: config.title || 'X-Bar 控制图'
        },
        animation: config.performance?.transition === false ? false : true,
        xAxis: {
            type: 'category',
            data: seriesData.map((_, i) => `P${i}`)
        },
        yAxis: {
            min: yMin,
            max: yMax
        },
        tooltip: {
            trigger: 'axis',
            show: config.tooltipMode !== 'none',
            formatter: (params: any) => {
                // console.log('[xbar] 提示:', params ,(typeof params[0].data === 'object') ? `${params[0].data.value}` : `${params[0].data}`);
                return config.tooltipMode === 'mini'
                    ? (typeof params[0].data === 'object') ? `${params[0].data.value}` : `${params[0].data}`
                    : undefined
            }
        },
        series: [
            {
                type: 'line',
                data: seriesData,
                large: true,  // 开启大数据优化模式
            }
        ],
        ...config.original
    };

    // ===== 5. 标记额外信息（用于插件或渲染）=====
    if (config.performance?.lazy) {
        (option as any).__lazy = true;
    }
    if (config.theme) {
        (option as any).__theme = config.theme;
    }
    if (config.rules) {
        (option as any).__rules = config.rules;
    }


    return option;

}
