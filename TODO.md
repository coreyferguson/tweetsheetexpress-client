
# TODO

- [x] New React PropTypes module
- [x] Upgrade React et al.
- [x] extract karma/webpack common config
- [x] Upgrade react-router
- [x] Fix tests
- [x] Redux
- [x] React-Redux
- [x] Sourcemaps not showing correctly in errors when `npm run testManual`
- [x] Missing `userId` request body property on `tweetAll`
- [x] Rename `redux` folders to `state`.
- [ ] Fix tests
- [ ] Code coverage reporting
- [ ] FE to tweet all assuming batch throttle time
- [ ] FE to send userId w/ request from cookie
- [ ] Common config for FE & BE
- [ ] Redux - test non-200 status code errors
- [ ] Unit tests take too long to bundle
- [ ] Combine `*.html` and `webpack` bundle to `dist/` folder.

# Dev Environment Setup

- Create S3 bucket with same name as domain: `tweetsheets-dev.overattribution.com`
- Create CloudFront `Web` distribution
    + `Redirect HTTP to HTTPS`
    + Maximum TTL: `18000` (5 min)
    + Default TTL: `60` (1 min)
    + Price Class: `Use Only US, Canada and Europe`
    + `Custom SSL Certificate`
    + Default Root Object: `index.html`
    + Alternate Domain Names (CNAMEs): `tweetsheets-dev.overattribution.com`
- Create Hosted Zone record set
    + A - IPv4
        * Name: `tweetsheets-dev`
        * Alias target: `d3hjz69o8boa6t.cloudfront.net.` (from distribution above)
    + AAAA - IPv6
        * Name: `tweetsheets-dev`
        * Alias target: `d3hjz69o8boa6t.cloudfront.net.` (from distribution above)
- Create custom domain in Amazon API Gateway
- Created Hosted Zone record set
    + A - IPv4
        * Name: `tweetsheets-dev-api`
        * Alias target: `d2jjsnjkd4n6ay.cloudfront.net.` (from api gateway custom domain distribution)
