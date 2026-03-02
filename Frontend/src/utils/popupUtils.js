// simple utility to show a popup message
// falls back to window.alert until a custom popup is registered
let showFn = (msg) => {
  window.alert(msg);
};

export function registerPopup(fn) {
  showFn = fn;
}

export function showPopup(msg) {
  showFn(msg);
}
