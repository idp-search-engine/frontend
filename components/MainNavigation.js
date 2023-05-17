import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation({ user, authURL }) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Coolest Search Engine</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Search</Link>
          </li>
          <li>
            <Link href='/new-page'>Add New Page</Link>
          </li>
          <li>
            {user ? (
              <Link href={authURL + "/logout"}>Logout</Link>
            ) : (
              <Link href={authURL + "/login"}>Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
