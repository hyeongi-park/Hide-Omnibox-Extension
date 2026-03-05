// content_script.js
(function () {
  function disableSuggestions() {
    // 검색 입력창 자동완성 끄기
    document.querySelectorAll('input[name="q"], textarea[name="q"]').forEach((el) => {
      el.setAttribute("autocomplete", "off");
      el.setAttribute("aria-autocomplete", "none");
    });

    // 제안 DOM 제거
    const kill = () => {
      document.querySelectorAll(
        '[role="listbox"], .G43f7e, .UUbT9, .aajZCb, .OBMEnb, .sbct, .sbsb_a, .sbfl_b'
      ).forEach((n) => n.remove());
    };

    // 초기 실행
    kill();

    // 동적으로 생성되는 제안 노드도 바로 제거
    new MutationObserver(kill).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", disableSuggestions, { once: true });
  } else {
    disableSuggestions();
  }
})();
