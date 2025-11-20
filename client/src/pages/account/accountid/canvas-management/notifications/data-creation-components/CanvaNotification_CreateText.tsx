const canvaNotification_CreateText = () => {
  if (Notification.permission === "granted") {
    new Notification("Text Activity Detected", {
      body: `New text fragment added!`,
    });
  }
};

export default canvaNotification_CreateText;
