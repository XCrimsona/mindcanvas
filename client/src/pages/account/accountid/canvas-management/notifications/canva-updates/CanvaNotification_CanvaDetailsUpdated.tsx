const canvaNotification_CanvaUpdated = () => {
  if (Notification.permission === "granted") {
    new Notification("Canvas Management Activity Detected", {
      body: `A canva's details have been updated!`,
    });
  }
};

export default canvaNotification_CanvaUpdated;
