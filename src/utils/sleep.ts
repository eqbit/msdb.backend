export const sleep = async (time: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
