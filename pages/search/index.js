import { useRouter } from 'next/router';
import NewSearch from "../../components/NewSearch";

export default function Home(props) {
    const router = useRouter();

    function searchHandler(searchData) {
      router.push({
        pathname: "/search",
        query: {
          "q": searchData.search
        }
      })
    }

    return (
        <>
          <h2>OUR Search Engine results</h2>
          <NewSearch onSearch={searchHandler} title="Search again"></NewSearch>
          {props.searchResults.map((searchResult, index) => {
            return (
              <div key={index}>
                <h3>
                  <a target="_blank" href={`${searchResult._source.original_url}`} rel="noopener noreferrer">{searchResult._source.original_url}</a>
                </h3>
                <hr />
              </div>
            )
          })}
        </>
      )
}

export async function getServerSideProps(context) {
    const searchParam = context.query.q

    const response = await fetch("http://" + (process.env.ESINTERACTOR_HOST || "localhost") + "/query?" + new URLSearchParams(
        {
            q: searchParam,
        }
    ),
    )
    const data = await response.json()
    console.log(data["hits"]["hits"])
  
    return {
      props: {
        searchResults: data.hits.hits
      }
    }
}