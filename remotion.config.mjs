import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// You can customize the Webpack config here if needed,
// but for simple cases, the default works well.
Config.overrideWebpackConfig((config) => {
  return config;
});
