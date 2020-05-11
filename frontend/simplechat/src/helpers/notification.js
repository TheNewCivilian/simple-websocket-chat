export default (title, body) => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(title, { // eslint-disable-line no-new
        body,
        icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2Fb%2Fb2%2FSJ_AB_logo.svg%2F1280px-SJ_AB_logo.svg.png&f=1&nofb=1',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { // eslint-disable-line no-new
            body,
            icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2Fb%2Fb2%2FSJ_AB_logo.svg%2F1280px-SJ_AB_logo.svg.png&f=1&nofb=1',
          });
        }
      });
    }
  }
};
