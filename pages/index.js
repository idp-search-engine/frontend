import Link from "next/link"
import { getCookies, getCookie } from 'cookies-next';

export default function Home(props) {
    return (
        <>
         <h1>Welcome!</h1>
         {props.user ? (
            <>
            <h2>Great success!</h2>
            <p>My man, {JSON.stringify(props.user, null, 4)}! Glad to see you!</p>
            <Link href="http://localhost:8000/logout">Logout sussy baka!</Link>
            </>
      ) : (
        <>
        <p>But who dafuq are you tho?</p>
        <Link href="http://localhost:8000/login">Login mofo</Link>
        </>
      )}
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    // Get a cookie
    const all_cookies = getCookies({ req, res });
    console.log(all_cookies)
    const token = getCookie('token', { req, res });
    console.log(req.headers)

    return { props: { user: token || null } };
  }