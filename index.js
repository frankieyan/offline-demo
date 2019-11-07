document.querySelector("#form").addEventListener("submit", event => {
  event.preventDefault();
  const values = Array.from(event.target.elements)
    .filter(element => element.id)
    .map(({ id, value }) => `${id}: ${value}`)
    .join("\n");

  window.alert(`Sending the following request through the wires: \n${values}`);

  event.target.reset();
});
