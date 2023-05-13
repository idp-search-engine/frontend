import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

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
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;