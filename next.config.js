module.exports = {
  future: {
    // opt-in to webpack 5s
    webpack5: true,
  },
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      exclude: /node_modules/,
      test: /\.(graphql|gql)$/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-tag/loader' }],
    })

    return config
  },
}
