import { getCookie } from 'cookies-next';

export async function getUserProps(pageProps) {
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

      try {
            const verifyURL = "http://" + (process.env.AUTH_HOST || "auth-service:8000") + "/auth/verify";
            console.log(verifyURL)
            const authRes = await fetch(verifyURL,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"id_token": user.id_token})
            })
            if (authRes.status !== 200) {
                user = null
            }
            const data = await authRes.json()
            console.log(data)
        } catch (error) {
            console.error("Error fetching:", error)
            user = null
        }
    }
  
    return {
      user,
      authURL
    };
  }
  
