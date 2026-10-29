// Dynamic config on top of app.json. The development build (eas.json profile "development" sets
// APP_VARIANT=development) gets its own package id and name, so it installs next to the normal app instead of
// replacing it. Every other build uses app.json unchanged.
module.exports = ({ config }) => {
  if (process.env.APP_VARIANT !== 'development') return config;
  return {
    ...config,
    name: `${config.name} (Dev)`,
    ios: { ...config.ios, bundleIdentifier: `${config.ios.bundleIdentifier}.dev` },
    android: { ...config.android, package: `${config.android.package}.dev` },
  };
};
