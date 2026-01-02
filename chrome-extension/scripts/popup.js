// RL for VLA Monitor - Popup Script

document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  setupEventListeners();
});

function setupEventListeners() {
  // 立即检查按钮
  document.getElementById('checkNow').addEventListener('click', () => {
    checkNow();
  });

  // 打开GitHub按钮
  document.getElementById('openGithub').addEventListener('click', () => {
    chrome.tabs.create({
      url: 'https://github.com/WinstonWmj/RL-for-VLA-Survey'
    });
  });
}

async function loadContent() {
  const contentDiv = document.getElementById('content');
  
  try {
    // 获取存储的新内容
    const { newItems = [], lastCheck = {} } = await chrome.storage.local.get(['newItems', 'lastCheck']);
    
    if (newItems.length === 0) {
      // 显示空状态
      contentDiv.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <div class="empty-state-text">
            暂无新内容<br>
            点击"立即检查"开始监控
          </div>
        </div>
      `;
    } else {
      // 按来源分组显示
      const groupedItems = groupBySource(newItems);
      contentDiv.innerHTML = renderGroupedItems(groupedItems, lastCheck);
    }
  } catch (error) {
    console.error('Error loading content:', error);
    contentDiv.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-text">加载失败，请重试</div>
      </div>
    `;
  }
}

function groupBySource(items) {
  const grouped = {};
  items.forEach(item => {
    if (!grouped[item.source]) {
      grouped[item.source] = [];
    }
    grouped[item.source].push(item);
  });
  return grouped;
}

function renderGroupedItems(groupedItems, lastCheck) {
  let html = '';
  
  const sources = [
    { key: 'arxiv', name: 'ArXiv', icon: '📄' },
    { key: 'github', name: 'GitHub', icon: '💻' },
    { key: 'huggingface', name: 'Hugging Face', icon: '🤗' },
    { key: 'zhihu', name: '知乎', icon: '🔍' }
  ];
  
  sources.forEach(source => {
    const items = groupedItems[source.name] || [];
    const lastCheckTime = lastCheck[source.key] 
      ? new Date(lastCheck[source.key]).toLocaleString('zh-CN')
      : '从未检查';
    
    html += `
      <div class="source-section">
        <div class="source-header">
          <div class="source-name">${source.icon} ${source.name}</div>
          <div class="status-badge status-active">${items.length} 条新内容</div>
        </div>
        <div class="item-meta" style="margin-bottom: 10px; font-size: 11px; color: #6b7280;">
          上次检查: ${lastCheckTime}
        </div>
        ${items.length > 0 ? renderItems(items) : '<p style="font-size: 12px; color: #9ca3af;">暂无新内容</p>'}
      </div>
    `;
  });
  
  return html;
}

function renderItems(items) {
  return `
    <ul class="item-list">
      ${items.map(item => `
        <li class="item">
          <div class="item-title">${escapeHtml(item.title)}</div>
          <div class="item-meta">
            ${item.date ? new Date(item.date).toLocaleDateString('zh-CN') : ''}
            ${item.link ? `<a href="${item.link}" target="_blank" style="color: #667eea; margin-left: 8px;">查看详情</a>` : ''}
          </div>
        </li>
      `).join('')}
    </ul>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function checkNow() {
  const checkBtn = document.getElementById('checkNow');
  const contentDiv = document.getElementById('content');
  
  // 显示检查中状态
  checkBtn.disabled = true;
  checkBtn.textContent = '检查中...';
  
  contentDiv.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>正在检查更新...</p>
    </div>
  `;
  
  try {
    // 发送消息给background script
    chrome.runtime.sendMessage({ action: 'checkNow' }, async (response) => {
      // 等待一段时间让background script完成检查
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 重新加载内容
      await loadContent();
      
      // 恢复按钮状态
      checkBtn.disabled = false;
      checkBtn.textContent = '立即检查';
    });
  } catch (error) {
    console.error('Error checking now:', error);
    checkBtn.disabled = false;
    checkBtn.textContent = '立即检查';
    
    contentDiv.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-text">检查失败，请重试</div>
      </div>
    `;
  }
}

// 模拟数据（用于演示）
function loadDemoData() {
  const demoItems = [
    {
      source: 'ArXiv',
      title: 'Improving Vision-Language-Action Model with Online RL',
      date: '2025-01-28',
      link: 'https://arxiv.org/abs/2501.16664'
    },
    {
      source: 'GitHub',
      title: 'Updated paper list with 5 new entries',
      date: '2026-01-02',
      link: 'https://github.com/Denghaoyuan123/Awesome-RL-VLA'
    },
    {
      source: 'Hugging Face',
      title: 'New model: Dream-VLA-7B',
      date: '2026-01-01',
      link: 'https://huggingface.co/Dream-org/Dream-VLA-7B'
    }
  ];
  
  chrome.storage.local.set({
    newItems: demoItems,
    lastCheck: {
      arxiv: Date.now() - 3600000,
      github: Date.now() - 7200000,
      huggingface: Date.now() - 86400000,
      zhihu: Date.now() - 172800000
    }
  });
}

// 如果是首次使用，加载演示数据
chrome.storage.local.get('newItems', (result) => {
  if (!result.newItems || result.newItems.length === 0) {
    loadDemoData();
    setTimeout(loadContent, 100);
  }
});
