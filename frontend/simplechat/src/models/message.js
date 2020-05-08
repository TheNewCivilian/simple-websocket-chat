
export default (text, self, username) => {
  const timeStamp = new Date().getTime();
  return {
    text,
    self,
    username,
    timeStamp,
  };
};
