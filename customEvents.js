// notes abouy custom events

// can create anywhere in your app and dispatch to any element in your page (incl document)
// will trigger event listeners and receive data sent

const myElement = document.createElement("div");

myElement.addEventListener("greeting", (event) => {
  console.log(`Greeting from:${event.detail.name}`);
});

// Elsewhere
// custom event params: name of event, object that holds any data we want to send to listener
const greetingEvent = new CustomEvent("greeting", {
  detail: {
    name: "Alex",
  },
});
myElement.dispatchEvent(greetingEvent);