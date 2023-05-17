import '../styles/globals.css';
import Layout from '../components/Layout';
import { getUserProps } from '../utils/auth';

function MyApp({ Component, pageProps, user, authURL }) {
  return (
    <Layout user={user} authURL={authURL}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  // Fetch additional data on the server side
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // Retrieve user authentication details and other data
  const { user, authURL } = await getUserProps(ctx);

  return { pageProps, user, authURL };
};

export default MyApp;