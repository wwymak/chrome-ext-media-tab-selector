# chrome-ext-media-tab-selector
Just a simple extension that highlights tab(s) where media is playing so you can stop them easily
When you click the extension button, it uses the chrome tabs api to query for the tabIDs of where {audible: true} and use `tabs.move` 
to swap them to a position next to the current tab you are on.

