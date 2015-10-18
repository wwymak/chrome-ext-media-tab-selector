/**
 * Created by wwymak on 15/10/2015.
 */

chrome.browserAction.onClicked.addListener(tabsQuery);

function tabsQuery(){
    console.log("tabs query")
    chrome.tabs.query({audible: true}, function(tabs) {
        console.log(tabs)
        //check if tab window id = current window Id
        //if yes higghlihgt the tab
        //if not-- tabs.move to current window, then hightlihgt
        tabs.forEach(function(item){
            var audioTabWindowID = item.windowID;
            //checkCurrTabWindow(audioTabWindowID, )
            chrome.tabs.update(item.id, {
                highlighted: true,
                //muted: true
            })
        })

    })
}

function checkCurrTabWindow(audibleTabWindowID, callback){
    chrome.tabs.getCurrent(function(tab){
        console.log(tab);
        if(tab.windowID != audibleTabWindowID){
            //move the window to top, and highlight audlbe tab
            callback(tab.windowID);
        }
    })
}

function highlightTab(tabID){
    chrome.tabs.update(item.id, {
        highlighted: true,
        //muted: true
    })
}

function moveToCurrWindow(tabID, currWindowID, callback){
    chrome.tabs.move(tabID, {windowId: currWindowID, index: 0}, callback)
}


//chrome.tabs.move(integer or array of integer tabIds, object moveProperties, function callback)