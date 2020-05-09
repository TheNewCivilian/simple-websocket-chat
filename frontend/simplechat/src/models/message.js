
export default (text, self, username, userId, users) => {
  const timeStamp = new Date().getTime();
  return {
    text,
    self,
    username,
    timeStamp,
    userId,
    users,
  };
};
