import { attachHeadersListener } from 'chrome-sidebar';
import { hosts, iframeHosts } from './settings';

chrome.browserAction.onClicked.addListener(tab => {
  chrome.storage.sync.get(['workerId'], function(result) {
    if (!result.workerId) {
      const url = chrome.runtime.getURL('/options.html');
      chrome.tabs.create({ url });
    }
  });
  chrome.tabs.executeScript(tab.id, {
    file: 'entry.js'
  });
});

attachHeadersListener({
  webRequest: chrome.webRequest,
  hosts,
  iframeHosts,
  overrideFrameOptions: true
});
