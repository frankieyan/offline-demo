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

function sendRequestThroughWire({ values }) {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
