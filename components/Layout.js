import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout({ user, authURL, children }) {
  return (
    <div>
      <MainNavigation user={user} authURL={authURL} />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default Layout;
