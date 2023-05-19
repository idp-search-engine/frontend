import { useState } from 'react';
import NewPage from "../../components/NewPage";
import ScrapeStatus from "../../components/ScrapeStatus";
import { getUserProps } from '../../utils/auth';
import Link from "next/link";

export default function Home({ user, authURL }) {
    const [taskId, setTaskId] = useState(null);
    const [scrapeStatus, setScrapeStatus] = useState(null);
    
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

    async function getScrapeStatusHandler(scrapeData) {
        const response = await fetch("/api/scrape-status?q=" + scrapeData.task, {method: 'GET'})
        const data = await response.json()
        setScrapeStatus(data.status)
    }

    return (
        <>
              {user ? (
            <>
                <h2>Add a page if you dare</h2>
                <NewPage onAddPage={addPageHandler}></NewPage>
                {taskId &&
                <h3>Page being added, task id: {taskId}</h3>}
                <h2>Get scrape status</h2>
                <ScrapeStatus onGetScrapeStatus={getScrapeStatusHandler}></ScrapeStatus>
                {scrapeStatus &&
                  <h3>Scrape status: {scrapeStatus}</h3>}
            </>
            ) : (
            <>
                <h1>You must be logged in to add pages</h1>
                <Link href={authURL + "/login"}>Login</Link>
            </>
      )}
        </>
      )
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