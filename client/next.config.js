module.exports = {
  env: {
    API_URL: 'http://localhost:4000/graphql',
  },
  webpack(config) {
    config.resolve.modules.push(__dirname)
    return config
  },
}
