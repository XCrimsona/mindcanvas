const canvaNotification_TextFragmentDeleted = () => {
  if (Notification.permission === "granted") {
    new Notification("Data fragment deletion alert", {
      body: `A text data fragment has been deleted!`,
    });
  }
};

export default canvaNotification_TextFragmentDeleted;
