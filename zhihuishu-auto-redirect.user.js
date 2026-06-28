// ==UserScript==
// @name         智慧树 point 页面自动跳转
// @namespace    https://ai-smart-course-student-pro.zhihuishu.com/
// @version      1.0.0
// @description  检测进入智慧树 point 页面后，自动跳转到指定成绩分析页面。
// @author       Codex
// @match        https://ai-smart-course-student-pro.zhihuishu.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const sourcePath = '/point';
  const targetUrl = 'https://ai-smart-course-student-pro.zhihuishu.com/singleCourse/gradeAnalysis/2027679343719124992/158526?mapUid=1807676095319904256';

  function shouldRedirect() {
    return location.origin === 'https://ai-smart-course-student-pro.zhihuishu.com'
      && location.pathname === sourcePath
      && location.href !== targetUrl;
  }

  function redirectIfNeeded() {
    if (shouldRedirect()) {
      location.replace(targetUrl);
    }
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
})();
