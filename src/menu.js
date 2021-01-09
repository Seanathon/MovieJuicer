searchTMDB = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "https://themoviedb.org/search?query=" + query});
};
  
chrome.contextMenus.create({
  title: "Juice This Movie",
  contexts:["selection"],
  onclick: searchTMDB
});
