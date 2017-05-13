
To bring up a dev environment:

- Create S3 bucket with same name as domain: `tweetsheets-dev.overattribution.com`
- Create CloudFront `Web` distribution
    + `Redirect HTTP to HTTPS`
    + Maximum TTL: `18000` (5 min)
    + Default TTL: `60` (1 min)
    + Price Class: `Use Only US, Canada and Europe`
    + `Custom SSL Certificate`
    + Default Root Object: `index.html`
- Create Hosted Zone record set
    + A - IPv4
        * Name: `tweetsheets-dev`
        * Alias target: `d3hjz69o8boa6t.cloudfront.net.` (from distribution above)
    + AAAA - IPv6
        * Name: `tweetsheets-dev`
        * Alias target: `d3hjz69o8boa6t.cloudfront.net.` (from distribution above)
