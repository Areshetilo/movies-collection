const API_V3 = 'fbc3bc6c91e2bf410b7bbf6ff5567525';
const URL = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_V3}`;
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};
const fetchRequestToken = () => {
  return fetch(`${URL}`, options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res.request_token;
    });
};
export default fetchRequestToken;
