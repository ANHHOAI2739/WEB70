export const logAPI = () => {
  console.log("API request at", new Date().toLocaleString("vi"));
  next();
};
