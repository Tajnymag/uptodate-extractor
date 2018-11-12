import browser from 'webextension-polyfill';

const messageEl = document.querySelector('#message');

messageEl.innerText = browser.i18n.getMessage('loadingMessage');

browser.tabs.executeScript({
	file: '/dist/in-page.bundle.js'
});

browser.runtime.onMessage.addListener(async (parsedTopic, sender, sendResponse) => {
	try {
		await navigator.clipboard.writeText(parsedTopic);
		messageEl.innerText = browser.i18n.getMessage('copySuccess');
	} catch (e) {
		console.error(e);
		messageEl.innerText = browser.i18n.getMessage('copyError');
	}
	sendResponse(true);
});
