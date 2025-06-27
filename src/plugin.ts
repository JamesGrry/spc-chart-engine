export type PluginHook = 'onParse' | 'onBuild' | 'onRender';

export interface Plugin {
  name: string;
  apply: (hook: PluginHook, config: any, option: any) => void;
}

const plugins: Plugin[] = [];

export function registerPlugin(plugin: Plugin) {
  plugins.push(plugin);
}

export function applyPlugins(hook: PluginHook, config: any, option: any) {
  const active = config.plugin || [];
  for (const plugin of plugins) {
    if (active.includes(plugin.name)) {
      plugin.apply(hook, config, option);
    }
  }
}
