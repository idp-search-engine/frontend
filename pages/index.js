import Link from "next/link";
import { useRouter } from 'next/router';
import NewSearch from "../components/NewSearch";
import { getUserProps } from '../utils/auth';

export default function Home({ user, authURL }) {
  const router = useRouter();

  function searchHandler(searchData) {
    router.push({
      pathname: "/search",
      query: {
        "q": searchData.search
      }
    });
  }

  return (
    <>
      <h1>Welcome!</h1>
      {user ? (
        <>
          <h2>Great success!</h2>
          <p>My man, {user.userinfo.nickname}! Glad to see you!</p>
          <Link href={authURL + "/logout"}>Logout sussy baka!</Link>
        </>
      ) : (
        <>
          <p>But who dafuq are you tho?</p>
          <Link href={authURL + "/login"}>Login mofo</Link>
        </>
      )}
      <NewSearch onSearch={searchHandler} title="Search Something man" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { user, authURL } = getUserProps({ req, res });

  return {
    props: {
      user,
      authURL
    }
  };
}
