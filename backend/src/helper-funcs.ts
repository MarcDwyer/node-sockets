export const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  console.log("lol wtf");
  return function() {
    console.log("shit");
    const args = arguments,
      ctx = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(ctx, args), delay);
  };
};
