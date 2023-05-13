import { useRef } from 'react';
import classes from './NewPage.module.css';

function NewSearch(props) {
    const addPageInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredURL = addPageInputRef.current.value;
  
      const pageData = {
        url: enteredURL,
      };
  
      props.onAddPage(pageData);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
        {props.title &&
          <label htmlFor='addPage'>{props.title}</label>
        }
          <input type='url' required id='addPage' ref={addPageInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add Page</button>
        </div>
      </form>
    )
}

export default NewSearch;