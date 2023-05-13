import { useRouter } from 'next/router';
import NewPage from "../../components/NewPage";

export default function Home(props) {
    const router = useRouter();

    async function addPageHandler(pageData) {
        console.log("add page")
        console.log(pageData)
        const response = await fetch("http://" + (process.env.WEBCRAWLER_HOST || "localhost") + "/tasks/scrape",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: pageData.url})
        }
        )
        const data = await response.json()
        console.log(data)
    }

    return (
        <>
          <h2>Add a page if you dare</h2>
          <NewPage onAddPage={addPageHandler}></NewPage>
        </>
      )
}