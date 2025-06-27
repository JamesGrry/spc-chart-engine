export interface ChartConfig {
    type: string; // 图表类型，如 'xbar'
    title?: string; // 图表标题
    min?: number; // Y 轴最小值
    max?: number; // Y 轴最大值

    data?: (number | object)[]; // 图表数据
    dataSource?: string; // 可选的远程数据接口

    theme?: string; // 主题风格，如 'dark'、'light'
    rules?: string[]; // 传递给插件的规则名，如 ['above3σ', 'trend']
    tooltipMode?: 'full' | 'mini' | 'none'; // tooltip 模式
    axisPolicy?: 'auto-round'; // Y 轴扩展策略

    plugin?: string[]; // 启用插件，如 ['anomalyDetector']

    performance?: {
        lazy?: boolean; // 懒加载
        downsample?: boolean; // 是否降采样
        maxPoints?: number; // 降采样保留的最大点数
        transition?: boolean; // 是否启用动画
        virtualScroll?: boolean; // 虚拟滚动，仅前端有效
    };

    [key: string]: any; // 允许扩展字段
}

export interface EChartsOption {
    title?: any;
    xAxis?: any;
    yAxis?: any;
    tooltip?: any;
    series?: any[];
    [key: string]: any;
}
