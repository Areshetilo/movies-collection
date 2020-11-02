import { error } from '@pnotify/core';

const searchErrorNotFound = (err) =>
  error({
    title: 'Oops!',
    text: `${err}`,
    delay: 3000,
    // sticker: false,
  });
export default searchErrorNotFound;
