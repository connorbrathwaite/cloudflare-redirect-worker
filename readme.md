# From Rachel Fullstack Challenge


## Cloudflare Worker Proxy

### The problem

From Rachel has multiple subdomains for its localized stores. The subdomains are
```
en.fromrachel.com
en-ca.fromrachel.com
en-us.fromrachel.com
fr.fromrachel.com
fr-ca.fromrachel.com
fr-fr.fromrachel.com
```

However, Shopify does not provide methods to control the route and or redirect users dynamically to different urls at the server level. How will we make sure that a visitor going to `fromrachel.com` will be redirected to the right localized subdomain?

We can setup a proxy in front of Shopify to be able to manipulate the request before it reaches the Shopify servers.

To do this, we use [Cloudflare Worker](https://developers.cloudflare.com/workers/). Workers are built using the web workers specifications  and run on Cloudflare servers instead of the browser. They can be used to process any incoming requests.

We’ll use them to direct our traffic to the right subdomain.

### Task

Write a simple Cloudflare Worker that will redirect traffic on `fromrachel.com` to the appropriate country AND language (locale) for this specific user. For example, if you visit `fromrachel.com` while in Canada and your browser is in English I should be redirect to `en-ca.fromrachel.com`.  However, if you visit from the US but your language is French, I should then be redirected to `fr.fromrachel.com`. Request path and search params should also be preserved with the redirect. If you request `fromrachel.com/pages/subscribe?coupon=test` from Canada in english you should be redirected to `en-ca.fromrachel.com/pages/subscribe?coupon=test`

- Your file should be copy pastable in the Worker Preview page here: https://cloudflareworkers.com/
- You should output a single javascript file, either by working off a single file or bundling your files.
- You can write your code in any flavor or super set of Javascript you would like.

*Tip*:
- Using https://cloudflareworkers.com/ `testing` tab you can set manual / mock request headers. That will be very helpful to test your solution.
- There could be multiple possible eligible subdomains for a given user, your solution should pick the best one.

### Questions

#### What else would you need to do before it’s ‘production ready’?

Monitoring, exception handling, config available through environment, test coverage, dig deeper into the Cloudflare api and best practices.

Unfamiliar with this vendor but of course CI/CD.

#### Did you know about Cloudflare worker before? Was is your opinion of it?

Felt like a sandboxed Lambda, documentation was great and repl made for a quality dev experience imo. Would be interested in digging deeper and exploring use-cases.

#### If you had to solve this original problem using any other solutions, what would you do differently?

Any microservice to proxy http requests (aws lambda, gcloud, etc), as a last resort implemented as an application level middleware.
