import classes from './MainNavigation.module.css';
import Dropdown from './Dropdown.js'
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
          <Dropdown user={user} authURL={authURL}></Dropdown>) : (
            <Link href={authURL + "/login"}>Login</Link>
          )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
