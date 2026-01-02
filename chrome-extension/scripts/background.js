// RL for VLA Monitor - Background Service Worker

// 监控源配置
const MONITOR_SOURCES = {
  arxiv: {
    name: 'ArXiv',
    url: 'https://arxiv.org/search/?query=reinforcement+learning+vision+language+action&searchtype=all&source=header',
    keywords: ['VLA', 'vision-language-action', 'reinforcement learning', 'robotic manipulation'],
    checkInterval: 6 * 60 * 60 * 1000 // 6小时检查一次
  },
  github: {
    name: 'GitHub',
    url: 'https://github.com/Denghaoyuan123/Awesome-RL-VLA',
    keywords: ['RL-VLA', 'commits', 'updates'],
    checkInterval: 12 * 60 * 60 * 1000 // 12小时检查一次
  },
  huggingface: {
    name: 'Hugging Face',
    url: 'https://huggingface.co/models?other=vla',
    keywords: ['VLA', 'vision-language-action'],
    checkInterval: 24 * 60 * 60 * 1000 // 24小时检查一次
  },
  zhihu: {
    name: '知乎',
    url: 'https://www.zhihu.com/search?type=content&q=VLA%20强化学习',
    keywords: ['VLA', '强化学习', '视觉语言动作'],
    checkInterval: 24 * 60 * 60 * 1000 // 24小时检查一次
  }
};

// 安装时初始化
chrome.runtime.onInstalled.addListener(() => {
  console.log('RL for VLA Monitor installed');
  
  // 初始化存储
  chrome.storage.local.set({
    lastCheck: {},
    newItems: [],
    settings: {
      notificationsEnabled: true,
      checkInterval: 'default'
    }
  });
  
  // 设置定时检查
  setupAlarms();
});

// 设置定时器
function setupAlarms() {
  // 为每个源设置独立的定时器
  Object.keys(MONITOR_SOURCES).forEach(sourceKey => {
    const source = MONITOR_SOURCES[sourceKey];
    chrome.alarms.create(`check-${sourceKey}`, {
      periodInMinutes: source.checkInterval / (60 * 1000)
    });
  });
}

// 监听定时器触发
chrome.alarms.onAlarm.addListener((alarm) => {
  const sourceKey = alarm.name.replace('check-', '');
  if (MONITOR_SOURCES[sourceKey]) {
    checkSource(sourceKey);
  }
});

// 检查特定源的更新
async function checkSource(sourceKey) {
  const source = MONITOR_SOURCES[sourceKey];
  console.log(`Checking ${source.name} for updates...`);
  
  try {
    // 获取上次检查时间
    const { lastCheck = {} } = await chrome.storage.local.get('lastCheck');
    const lastCheckTime = lastCheck[sourceKey] || 0;
    
    // 这里应该实际抓取网页内容，但由于Chrome扩展的限制，
    // 实际实现需要使用content script或者后端API
    // 这里提供一个框架
    
    // 模拟检查逻辑
    const hasNewContent = await simulateContentCheck(source, lastCheckTime);
    
    if (hasNewContent) {
      // 发送通知
      await sendNotification(source.name, '发现新内容');
      
      // 更新最后检查时间
      lastCheck[sourceKey] = Date.now();
      await chrome.storage.local.set({ lastCheck });
    }
    
  } catch (error) {
    console.error(`Error checking ${source.name}:`, error);
  }
}

// 模拟内容检查（实际应用中需要实现真实的抓取逻辑）
async function simulateContentCheck(source, lastCheckTime) {
  // 实际实现需要：
  // 1. 使用fetch API获取页面内容
  // 2. 解析HTML提取相关信息
  // 3. 与上次检查结果对比
  // 4. 如果发现新内容，存储到chrome.storage
  
  return false; // 暂时返回false
}

// 发送通知
async function sendNotification(sourceName, message) {
  const { settings } = await chrome.storage.local.get('settings');
  
  if (settings.notificationsEnabled) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '../icons/icon128.png',
      title: `RL for VLA Monitor - ${sourceName}`,
      message: message,
      priority: 2
    });
  }
}

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkNow') {
    // 立即检查所有源
    Object.keys(MONITOR_SOURCES).forEach(sourceKey => {
      checkSource(sourceKey);
    });
    sendResponse({ status: 'checking' });
  } else if (request.action === 'getNewItems') {
    // 返回新发现的内容
    chrome.storage.local.get('newItems', (result) => {
      sendResponse({ items: result.newItems || [] });
    });
    return true; // 保持消息通道开启
  }
});

// 实际的内容抓取函数（需要配合content script使用）
async function fetchArxivUpdates() {
  // ArXiv API查询
  const query = 'reinforcement learning vision language action';
  const apiUrl = `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&sortBy=submittedDate&sortOrder=descending&max_results=10`;
  
  try {
    const response = await fetch(apiUrl);
    const xmlText = await response.text();
    
    // 解析XML并提取论文信息
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const entries = xmlDoc.getElementsByTagName('entry');
    
    const papers = [];
    for (let entry of entries) {
      const title = entry.getElementsByTagName('title')[0]?.textContent;
      const summary = entry.getElementsByTagName('summary')[0]?.textContent;
      const published = entry.getElementsByTagName('published')[0]?.textContent;
      const link = entry.getElementsByTagName('id')[0]?.textContent;
      
      papers.push({ title, summary, published, link, source: 'ArXiv' });
    }
    
    return papers;
  } catch (error) {
    console.error('Error fetching ArXiv updates:', error);
    return [];
  }
}

// GitHub API查询
async function fetchGitHubUpdates() {
  const repoUrl = 'https://api.github.com/repos/Denghaoyuan123/Awesome-RL-VLA/commits';
  
  try {
    const response = await fetch(repoUrl);
    const commits = await response.json();
    
    return commits.slice(0, 5).map(commit => ({
      title: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      link: commit.html_url,
      source: 'GitHub'
    }));
  } catch (error) {
    console.error('Error fetching GitHub updates:', error);
    return [];
  }
}

console.log('RL for VLA Monitor background script loaded');
