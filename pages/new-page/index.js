import { useState } from 'react';
import NewPage from "../../components/NewPage";

export default function Home() {
    const [taskId, setTaskId] = useState(null);
    
    async function addPageHandler(pageData) {
        const response = await fetch("/api/new-page",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData)
        }
        )
        const data = await response.json()
        setTaskId(data.task_id);
    }

    return (
        <>
          <h2>Add a page if you dare</h2>
          <NewPage onAddPage={addPageHandler}></NewPage>
          {taskId &&
          <h3>Page being added, task id: {taskId}</h3>}
        </>
      )
}
