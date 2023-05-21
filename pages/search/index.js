import { useRouter } from 'next/router';
import { useState } from 'react';
import NewSearch from "../../components/NewSearch";
import { getUserProps } from '../../utils/auth';

export default function Home(props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6; // Number of results to display per page

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
      <button class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 py-1 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" key={i} onClick={() => handlePageChange(i)}>
        {i}
      </button>
    );
  }

  return (
    <>
      <h2>OUR Search Engine results</h2>
      <NewSearch onSearch={searchHandler} title="Search again" />
      <div class="space-y-2">
      <div>
        {currentResults.map((searchResult, index) => {
          return (
            <div key={index}>
              <h3>
                <a class="block w-full text-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" target="_blank" href={`${searchResult._source.original_url}`} rel="noopener noreferrer">{searchResult._source.original_url}</a>
              </h3>
              <hr />
            </div>
          )
        })}
      </div>
      <div class="text-center">
        {paginationLinks}
      </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const searchParam = context.query.q
  const { req, res } = context;
  const { user, authURL } = await getUserProps({ req, res });

  const response = await fetch("http://" + (process.env.ESINTERACTOR_HOST || "es-interactor-service:8000") + "/query?" + new URLSearchParams(
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
