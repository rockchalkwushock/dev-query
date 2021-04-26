// https://github.com/iamvishnusankar/next-sitemap
module.exports = {
  changefreq: 'monthly',
  generateRobotsTxt: true,
  siteUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://dev-query.com'
      : 'http://localhost:4000',
}
