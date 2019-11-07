const pendingRequests = [];

document.querySelector("#form").addEventListener("submit", event => {
  const values = Array.from(event.target.elements)
    .filter(element => element.id)
    .map(({ id, value }) => `${id}: ${value}`)
    .join("\n");

  event.preventDefault();
  event.target.reset();

  sendRequestThroughWire({ values })
    .then(() => {
      window.alert(`Sent the following request through the wires: \n${values}`);
    })
    .catch(() => {
      // Noop
    });
});

window.addEventListener("online", processPendingRequests);
window.addEventListener("online", hideOfflineNotification);
window.addEventListener("offline", showOfflineNotification);

function sendRequestThroughWire({ values }) {
  const isOnline = navigator.onLine;

  return new Promise((resolve, reject) => {
    if (!isOnline) {
      window.alert(`You're currently offline! When you regain network connectivity your request will be sent. Putting the following request in the queue now: \n${values}`);
      pendingRequests.push(() => resolve({ queued: true, values }));
      return;
    }

    resolve();
  });
}

function processPendingRequests() {
  while (pendingRequests.length) {
    pendingRequests.shift()();
  }
}

function showOfflineNotification() {
  document.querySelector("#offline-notification").setAttribute("style", "visibility: visible");
}

function hideOfflineNotification() {
  document.querySelector("#offline-notification").setAttribute("style", "");
}
