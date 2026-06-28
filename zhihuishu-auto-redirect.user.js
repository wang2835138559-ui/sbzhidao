// ==UserScript==
// @name         智慧树 point 页面自动跳转
// @namespace    https://ai-smart-course-student-pro.zhihuishu.com/
// @version      1.0.1
// @description  检测进入智慧树 point 页面后，自动跳转到指定成绩分析页面。
// @author       Codex
// @match        https://ai-smart-course-student-pro.zhihuishu.com/*
// @include      https://ai-smart-course-student-pro.zhihuishu.com/point*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const sourcePath = '/point';
  const targetUrl = 'https://ai-smart-course-student-pro.zhihuishu.com/singleCourse/gradeAnalysis/2031261188964069376/183323?mapUid=1819278690631159808';
  let redirected = false;

  function shouldRedirect() {
    return location.origin === 'https://ai-smart-course-student-pro.zhihuishu.com'
      && (location.pathname === sourcePath || location.pathname.startsWith(`${sourcePath}/`))
      && location.href !== targetUrl;
  }

  function redirectIfNeeded() {
    if (redirected || !shouldRedirect()) {
      return;
    }

    redirected = true;
    location.href = targetUrl;
  }

  redirectIfNeeded();

  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    redirectIfNeeded();
    return result;
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    const result = originalReplaceState.apply(this, args);
    redirectIfNeeded();
    return result;
  };

  window.addEventListener('popstate', redirectIfNeeded);
  window.addEventListener('hashchange', redirectIfNeeded);
  window.addEventListener('pageshow', redirectIfNeeded);
  document.addEventListener('readystatechange', redirectIfNeeded);
  setInterval(redirectIfNeeded, 500);
})();
