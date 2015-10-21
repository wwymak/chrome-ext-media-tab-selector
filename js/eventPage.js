/**
 * Created by wwymak on 15/10/2015.
 */
/**
 * promisifying chrome's api to stop it becoming a messy callback nest
 */
chrome.promise = new ChromePromise();

chrome.browserAction.onClicked.addListener(tabsQuery);

function tabsQuery(){

    var p1 = findAudibleTabs(),
        p2 = getCurrTabWindowPromise();

    Promise.all([p1, p2]).then(function(values) {
        var audibleTabArry = [];
        values[0].forEach(function(d){
            audibleTabArry.push(d.tabID)
        })
        moveTabs(audibleTabArry, values[1][0].windowID, (values[1][0].tabIndex + 1))

        chrome.tabs.query({audible: true}, function(tabs) {
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
    });

}
/**
 * grabbing info about any tab that has sound playing and returngin a promise with the data
 * @returns {*} promise about the tabid and windowID for chaining
 */
function findAudibleTabs(){
    return chrome.promise.tabs.query({audible: true}).then(function(tabs){
        var promises = tabs.map(function(tab) {
            return {windowID: tab.windowId, tabID: tab.id}
        });

        return Promise.all(promises);
    })
}

function getCurrTabWindowPromise(){
    return chrome.promise.tabs.query({currentWindow: true, active: true}).then(function(tabs) {
        var promises = tabs.map(function (tab) {
            return {windowID: tab.windowId, tabID: tab.id, tabIndex: tab.index}
        });

        return Promise.all(promises);
    })
}

function moveTabs(tabArr, windowID, i){
    chrome.promise.tabs.move(tabArr, {windowId: windowID, index: i})
}

