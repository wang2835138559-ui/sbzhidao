// ==UserScript==
// @name         New Userscript BZUK-1
// @namespace    https://docs.scriptcat.org/
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();
// ==UserScript==
// @name         Auto Click AI Panel on GradeAnalysis
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在gradeAnalysis页面自动点击AI悬浮窗和开始按钮
// @author       You
// @match        https://ai-smart-course-student-pro.zhihuishu.com/singleCourse/gradeAnalysis*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 检查URL是否匹配目标页面
    if (!window.location.href.includes('/singleCourse/gradeAnalysis')) {
        return;
    }

    // 等待元素出现的工具函数
    function waitForElement(selector, callback, maxAttempts = 50, interval = 100) {
        let attempts = 0;
        const timer = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(timer);
                callback(element);
            } else if (attempts >= maxAttempts) {
                clearInterval(timer);
                console.log(`元素 ${selector} 未在 ${maxAttempts * interval}ms 内找到`);
            }
            attempts++;
        }, interval);
    }

    // 点击AI悬浮窗按钮
    waitForElement('#panel-toggle', (toggleButton) => {
        toggleButton.click();
        console.log('已点击AI悬浮窗按钮');

        // 等待AI面板出现后点击开始按钮
        waitForElement('#start-button', (startButton) => {
            startButton.click();
            console.log('已点击开始自动答题按钮');
        });
    });
})();
