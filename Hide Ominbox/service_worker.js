const KEY = "serverSuggestionsDisabled";

async function setPrivacy(disable) {
  if (chrome.privacy?.services?.searchSuggestEnabled) {
    // disable = true → suggestions OFF
    await chrome.privacy.services.searchSuggestEnabled.set({ value: !disable });
  }
}

// 최초 설치 시는 기본값만 세팅하고 이후는 덮어쓰지 않는다.
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await chrome.storage.local.set({ [KEY]: true });
    await setPrivacy(true);
    await chrome.action.setTitle({ title: "Server suggestions OFF" });
  }
});

// 팝업에서 토글 요청 처리
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  (async () => {
    if (msg?.cmd === "set-disable") {
      const disable = !!msg.disable;
      await chrome.storage.local.set({ [KEY]: disable });
      await setPrivacy(disable);
      await chrome.action.setTitle({
        title: disable ? "Server suggestions OFF" : "Server suggestions ON"
      });
      sendResponse({ ok: true });
    }
  })();
  return true;
});
