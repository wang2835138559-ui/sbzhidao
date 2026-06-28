// ==UserScript==
// @name         sbtz
// @namespace    https://docs.scriptcat.org/
// @version      0.4.0
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
// 脚本猫自动提交作业脚本 - 修正变量名版
// 使用精确的类名选择器查找提交作业按钮

(function() {
    'use strict';
    
    // 配置参数
    const CONFIG = {
        submitWaitTime: 150,    // 提交前等待时间（秒）
        jumpWaitTime: 10,      // 跳转前等待时间（秒）
        checkInterval: 1000    // 检查按钮的间隔（毫秒）
    };
    
    // 页面URL
    const FIRST_PAGE_URL = "https://studentexamcomh5.zhihuishu.com/studentReviewTestOrExam";
    const SECOND_PAGE_URL = "https://ai-smart-course-student-pro.zhihuishu.com/singleCourse/gradeAnalysis/2031261188964069376/183323?mapUid=1819278690631159808";
    
    let submitButton = null;
    let timerId = null;  // 修改：将 intervalId 改为 timerId 避免冲突
    let checkTimer = null;  // 新增：用于检查按钮的定时器
    
    // 查找提交作业按钮 - 使用精确的类名选择器
    function findSubmitButton() {
        console.log('正在查找提交作业按钮...');
        
        // 方法1：使用精确的类名选择器
        try {
            const button = document.querySelector('span.reviewDone.ZHIHUISHU_QZ');
            if (button) {
                console.log('找到按钮:', button.tagName, button.className, button.textContent);
                return button;
            }
        } catch (e) {
            console.log('类名选择器方法失败:', e);
        }
        
        // 方法2：使用XPath精确查找
        try {
            const xpath = "//span[contains(@class, 'reviewDone') and contains(@class, 'ZHIHUISHU_QZ')]";
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const button = result.singleNodeValue;
            if (button) {
                console.log('找到按钮:', button.tagName, button.className, button.textContent);
                return button;
            }
        } catch (e) {
            console.log('XPath方法失败:', e);
        }
        
        // 方法3：检查所有span元素
        const spans = document.querySelectorAll('span');
        for (let span of spans) {
            if (span.className && span.className.includes('reviewDone') && span.className.includes('ZHIHUISHU_QZ')) {
                console.log('找到按钮:', span.tagName, span.className, span.textContent);
                return span;
            }
        }
        
        console.log('未找到提交作业按钮');
        return null;
    }
    
    // 点击提交按钮
    function clickSubmitButton() {
        if (!submitButton) {
            submitButton = findSubmitButton();
        }
        
        if (submitButton) {
            console.log('找到提交作业按钮，准备点击...');
            submitButton.click();
            console.log('已点击提交作业按钮');
            return true;
        } else {
            console.log('未找到提交作业按钮，等待页面加载...');
            return false;
        }
    }
    
    // 跳转到第二个页面
    function jumpToSecondPage() {
        console.log('等待' + CONFIG.jumpWaitTime + '秒后跳转到第二个页面...');
        setTimeout(() => {
            console.log('跳转到: ' + SECOND_PAGE_URL);
            window.location.href = SECOND_PAGE_URL;
        }, CONFIG.jumpWaitTime * 1000);
    }
    
    // 主函数
    function startAutoSubmit() {
        const currentUrl = window.location.href;
        
        // 检查当前URL
        if (currentUrl.includes(FIRST_PAGE_URL)) {
            console.log('检测到第一个页面，开始执行操作...');
            console.log('将在' + CONFIG.submitWaitTime + '秒后点击提交作业');
            console.log('然后' + CONFIG.jumpWaitTime + '秒后跳转到第二个页面');
            
            // 等待70秒后点击提交按钮
            timerId = setTimeout(() => {
                if (clickSubmitButton()) {
                    // 点击成功后，等待10秒跳转
                    jumpToSecondPage();
                } else {
                    console.log('未找到提交按钮，停止脚本');
                }
            }, CONFIG.submitWaitTime * 1000);
            
        } else if (currentUrl.includes(SECOND_PAGE_URL)) {
            console.log('已跳转到第二个页面，脚本执行完成');
        } else {
            console.log('当前页面不是目标页面，脚本停止');
        }
    }
    
    // 启动脚本
    console.log('脚本猫自动提交作业脚本已启动');
    console.log('配置：在第一个页面等待' + CONFIG.submitWaitTime + '秒后提交，' + CONFIG.jumpWaitTime + '秒后跳转');
    console.log('第一个页面: ' + FIRST_PAGE_URL);
    console.log('第二个页面: ' + SECOND_PAGE_URL);
    console.log('脚本将只执行一次');
    
    // 等待页面加载完成
    if (document.readyState === 'complete') {
        startAutoSubmit();
    } else {
        window.addEventListener('load', startAutoSubmit);
    }
})();


