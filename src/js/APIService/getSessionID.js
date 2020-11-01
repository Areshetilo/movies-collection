const API_V3 = 'fbc3bc6c91e2bf410b7bbf6ff5567525';

const fetchSessionID = (requestToken) => {
  const URL = `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_V3}&request_token=${requestToken}`;
  console.log(URL);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${URL}`, options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res.session_id;
    });
};
export default fetchSessionID;
