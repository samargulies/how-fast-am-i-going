module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  runtimeCompiler: true,
  pwa: {
    name: 'How Fast',
    themeColor: '#f13a3a',
    msTileColor: '#f13a3a',
    assetsVersion: '3',
    appleMobileWebAppCapable: 'yes',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [/_redirects/, /ads\.txt/, /\.map$/, /manifest\.json$/],
    },
  },
};
