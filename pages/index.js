import { useRouter } from 'next/router';
import NewSearch from "../components/NewSearch";
import { getUserProps } from '../utils/auth';

export default function Home({ user, authURL}) {
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
      <NewSearch onSearch={searchHandler} title="Search Something man" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { user, authURL } = await getUserProps({ req, res });

  return {
    props: {
      user,
      authURL
    }
  };
}
