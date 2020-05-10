
export default (text, self, userName, userId, users) => {
  const timeStamp = new Date().getTime();
  return {
    text,
    self,
    userName,
    timeStamp,
    userId,
    users,
  };
};
