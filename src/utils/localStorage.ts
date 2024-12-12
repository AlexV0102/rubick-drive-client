export { getItemLocalStorage, setItemLocalStorage };

const getItemLocalStorage = (item: any) => {
  try {
    return localStorage.getItem(item);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const setItemLocalStorage = (item: any) => (value: any) => {
  try {
    localStorage.setItem(item, value);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
