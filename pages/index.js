import Link from "next/link"
import { getCookies, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import NewSearch from "../components/NewSearch";

export default function Home(props) {
    const authURL = "http://" + (process.env.PROXY_IP || "localhost") + "/auth"
    const router = useRouter();

    function searchHandler(searchData) {
      router.push({
        pathname: "/search",
        query: {
          "q": searchData.search
        }
      })
    }

    return (
        <>
         <h1>Welcome!</h1>
         {props.user ? (
            <>
            <h2>Great success!</h2>
            <p>My man, {props.user.userinfo.nickname}! Glad to see you!</p>
            <Link href={authURL + "/logout"}>Logout sussy baka!</Link>
            </>
      ) : (
        <>
        <p>But who dafuq are you tho?</p>
        <Link href={authURL + "/login"}>Login mofo</Link>
        </>
      )}
        <NewSearch onSearch={searchHandler} title="Search Something man"></NewSearch>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    // Get a cookie
    const allCookies = getCookies({ req, res })
    var tokenCookie = getCookie('token', { req, res })
    console.log(req.headers)

    if (tokenCookie) {
      tokenCookie = tokenCookie.replace(/'/g, '"')
      tokenCookie = tokenCookie.replace(/\\054/g, ',')
      tokenCookie = tokenCookie.replace(/True/g, 'true')
      tokenCookie = tokenCookie.replace(/False/g, 'false')
      console.log(JSON.parse(tokenCookie))
      return {props: {user: JSON.parse(tokenCookie)}}
    }

    return { props: { user: null }}
  }