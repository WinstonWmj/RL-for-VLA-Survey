document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveBtn').addEventListener('click', saveOptions);

function saveOptions() {
  const githubToken = document.getElementById('githubToken').value;
  const repoOwner = document.getElementById('repoOwner').value;
  const repoName = document.getElementById('repoName').value;

  chrome.storage.local.set({
    githubToken,
    repoOwner,
    repoName
  }, () => {
    const status = document.getElementById('status');
    status.textContent = '设置已保存！';
    status.className = 'status success';
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);
  });
}

function restoreOptions() {
  chrome.storage.local.get({
    githubToken: '',
    repoOwner: 'WinstonWmj',
    repoName: 'RL-for-VLA-Survey'
  }, (items) => {
    document.getElementById('githubToken').value = items.githubToken;
    document.getElementById('repoOwner').value = items.repoOwner;
    document.getElementById('repoName').value = items.repoName;
  });
}
