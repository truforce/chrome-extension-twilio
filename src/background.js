import { attachHeadersListener } from 'chrome-sidebar';
import { hosts, iframeHosts } from './settings';

chrome.browserAction.onClicked.addListener(tab => {
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
