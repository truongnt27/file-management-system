import { get, includes } from 'lodash';

export const searchStringFromArr = (arr = [], searchablePropertys = [], searchString = '') => {
  const normalizedSearchString = searchString.toLowerCase();
  let found = false;

  const result = arr && arr.filter(item => {
    found = false;
    searchablePropertys.forEach(searchableProperty => {
      const searchableContents = get(item, searchableProperty, '').toLowerCase();
      if (includes(searchableContents, normalizedSearchString)) {
        found = true;
      }
    })
    return found;
  });
  return result;
}