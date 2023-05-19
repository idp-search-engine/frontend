// GET

async function handler(req, res) {
    if (req.method == "GET") {
        const url = new URL("http://" + (process.env.WEBCRAWLER_HOST || "web-crawler-service:8000") + "/tasks/get/" + req.query.q);
        const newReq = new Request(url, {
          method: 'GET'
        });

        try {
          const response = await fetch(newReq);
          const responseData = await response.json();
          res.status(200).json(responseData); // Send the response back to the client
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' }); // Send an error response back to the client
        }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' }); // Send a 405 Method Not Allowed response for non-POST requests
    }
}

export default handler