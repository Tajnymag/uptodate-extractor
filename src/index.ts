import Tab = browser.tabs.Tab;

function protocolIsApplicable(url: string | undefined) {
  return url === 'https://www.uptodate.com/home';
}

function initializePageAction(tab: Tab) {
  if (!tab.id) {
    throw 'Tab.id or Tab.url was undefined!';
  }

  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: "assets/img/logo.svg"});
    browser.pageAction.show(tab.id);
  }
}

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});