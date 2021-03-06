var tabStorage = [];

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

	console.log(tab.url);
	var code = 'copySimulation()';
	if (tab.url.match(/form\?p=58&t=3/)) {
		code = 'pasteSimulation()';
	}
  chrome.tabs.executeScript({
    code: code
  });
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

    if(request.cmd == "save") {
      tabStorage[sender.tab.id] = request.data;
    }

    if(request.cmd == "load") {
      sendResponse(tabStorage[sender.tab.id]);
    }

    if(request.cmd == "launchNewSimulationScreen") {
    	// Same tab: chrome.tabs.update(sender.tab.id, {url: request.redirect}, function() {});
			chrome.tabs.create({ active: true, url: request.url }, function ( tab ) {})
    }
});
