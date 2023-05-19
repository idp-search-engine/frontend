import { useRef } from 'react';
import classes from './ScrapeStatus.module.css';

function ScrapeStatus(props) {
    const taskIdInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const scrape_id = taskIdInputRef.current.value;
  
      const pageData = {
        task: scrape_id,
      };
  
      props.onGetScrapeStatus(pageData);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
        {props.title &&
          <label htmlFor='getScrapeStatus'>{props.title}</label>
        }
          <input required id='getScrapeStatusPage' ref={taskIdInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Get scrape status</button>
        </div>
      </form>
    )
}

export default ScrapeStatus;