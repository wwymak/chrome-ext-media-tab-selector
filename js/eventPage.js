/**
 * Created by wwymak on 15/10/2015.
 */

chrome.browserAction.onClicked.addListener(tabsQuery);

function tabsQuery(){
    console.log("tabs query")
    chrome.tabs.query({audible: true}, function(tabs) {
        console.log(tabs)
        tabs.forEach(function(item){
            chrome.tabs.update(item.id, {
                highlighted: true,
                muted: true
            })
        })

    })
}