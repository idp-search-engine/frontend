import { getCookie } from 'cookies-next';

export function getUserProps(pageProps) {
    const { req, res } = pageProps;
    const tokenCookie = getCookie('token', { req, res });
    const authURL = "http://" + (process.env.PROXY_IP || "localhost") + "/auth";
    let user = null;
  
    if (tokenCookie) {
      let parsedToken = tokenCookie.replace(/'/g, '"');
      parsedToken = parsedToken.replace(/\\054/g, ',');
      parsedToken = parsedToken.replace(/True/g, 'true');
      parsedToken = parsedToken.replace(/False/g, 'false');
      try {
        user = JSON.parse(parsedToken);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  
    return {
      user,
      authURL
    };
  }
  
