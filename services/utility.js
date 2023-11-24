export const debounce = (fn, delay = 300) => {
  let timerID;
  return (...args) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
