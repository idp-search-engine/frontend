import { useRef } from 'react';
import classes from './NewSearch.module.css';

function NewSearch(props) {
    const searhInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredSearch = searhInputRef.current.value;
  
      const searchData = {
        search: enteredSearch,
      };
  
      props.onSearch(searchData);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
        {props.title &&
          <label htmlFor='search'>{props.title}</label>
        }
          <input type='text' required id='search' ref={searhInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Search</button>
        </div>
      </form>
    )
}

export default NewSearch;