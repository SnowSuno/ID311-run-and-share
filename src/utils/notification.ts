export const notify = (message: string) => {
  navigator?.serviceWorker?.register("sw.js");
  Notification.requestPermission((result) => {
    if (result === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(message);
      });
    }
  });
};
