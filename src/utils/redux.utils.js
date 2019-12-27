export const createAction = (type, payload, meta) => ({ type, payload, meta });

// item.id can be '0', so a simple (item => item && item.id) doesn't work ;)
const validDataItems = (data, idField = 'id') => {
  return data.filter(
    item => item && item[idField] !== undefined && item[idField] !== null,
  );
};

export const normalizedStateAll = (data, idField = 'id') => {
  return validDataItems(data, idField).map(item => item[idField]);
};

export const normalizedStateById = (data, idField = 'id') => {
  return validDataItems(data, idField).reduce(
    (accumulator, item) => ({
      ...accumulator,
      [item[idField]]: item,
    }),
    {},
  );
};
