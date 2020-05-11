export default (title, body, icon) => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(title, { // eslint-disable-line no-new
        body,
        icon,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { // eslint-disable-line no-new
            body,
            icon,
          });
        }
      });
    }
  }
};
