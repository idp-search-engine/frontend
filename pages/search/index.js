import { useRouter } from 'next/router';
import { useState } from 'react';
import NewSearch from "../../components/NewSearch";
import { getUserProps } from '../../utils/auth';

export default function Home(props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9; // Number of results to display per page

  function searchHandler(searchData) {
    router.push({
      pathname: "/search",
      query: {
        "q": searchData.search
      }
    })
  }

  // Calculate the index range for the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = props.searchResults.slice(indexOfFirstResult, indexOfLastResult);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination links
  const pageNumbers = Math.ceil(props.searchResults.length / resultsPerPage);
  const paginationLinks = [];
  for (let i = 1; i <= pageNumbers; i++) {
    paginationLinks.push(
      <button key={i} onClick={() => handlePageChange(i)}>
        {i}
      </button>
    );
  }

  return (
    <>
      <h2>OUR Search Engine results</h2>
      <NewSearch onSearch={searchHandler} title="Search again" />
      <div>
        {currentResults.map((searchResult, index) => {
          return (
            <div key={index}>
              <h3>
                <a target="_blank" href={`${searchResult._source.original_url}`} rel="noopener noreferrer">{searchResult._source.original_url}</a>
              </h3>
              <hr />
            </div>
          )
        })}
      </div>
      <div>
        {paginationLinks}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const searchParam = context.query.q
  const { req, res } = context;
  const { user, authURL } = getUserProps({ req, res });

  const response = await fetch("http://" + (process.env.ESINTERACTOR_HOST || "localhost") + "/query?" + new URLSearchParams(
    {
      q: searchParam,
    }
  ))
  const data = await response.json()
  console.log(data["hits"]["hits"].length)

  return {
    props: {
      user,
      authURL,
      searchResults: data.hits.hits
    }
  }
}
