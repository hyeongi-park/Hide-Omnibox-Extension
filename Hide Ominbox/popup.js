const KEY = "serverSuggestionsDisabled";

async function getState() {
  const data = await chrome.storage.local.get(KEY);
  return !!data[KEY];
}

async function setState(disable) {
  await chrome.runtime.sendMessage({ cmd: "set-disable", disable });
}

document.getElementById("toggle").addEventListener("click", async () => {
  const cur = await getState();
  await setState(!cur);
  render();
});

async function render() {
  const cur = await getState();
  document.getElementById("state").textContent =
    cur ? "Server suggestions: OFF" : "Server suggestions: ON";
}

render();
