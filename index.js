const BASE_HOSTNAME = "fromrachel.com";

const VALID_REGIONS = ["ca", "us", "fr"];

const VALID_LOCALE_COUNTRIES = {
  en: ["ca", "us"],
  fr: ["ca", "fr"]
};

const USER_AGENT_LANG_HEADER = "Accept-Language";

const FALLBACK_URL = "https://en.fromrachel.com";

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

function redirectResponse(url, type = 301) {
  return Response.redirect(url, type);
}

async function handleRequest(request) {
  // Note: Currently, settings in the cf object cannot be tested in the playground.
  const mockRequest = {
    ...request,
    cf: {
      country: "us"
    }
  };

  const { url, method, headers, cf } = mockRequest;
  const originalUrl = new URL(url);
  const { search, hostname, pathname } = originalUrl;

  const rawUserAgentLocale = headers.get(USER_AGENT_LANG_HEADER) || "en";

  const userAgentLocale = rawUserAgentLocale
    .match(/[a-zA-Z\-]{2,10}/g)[0]
    .toLowerCase()
    .split("-")[0];

  const countryCode = VALID_LOCALE_COUNTRIES[userAgentLocale];

  if (!countryCode || !userAgentLocale) {
    return redirectResponse(FALLBACK_URL, 500);
  }

  const redirectUrlLocalSubdomain = userAgentLocale
    ? `${userAgentLocale}-`
    : "";

  const redirectUrl =
    `https://${redirectUrlLocalSubdomain}${cf.country}.${hostname}${pathname}` + search;

  return redirectResponse(redirectUrl);
}
