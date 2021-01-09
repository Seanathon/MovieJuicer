searchTMDB = function(word){
  var query = word.selectionText;
  console.log(word, query)
  chrome.tabs.create({url: "https://themoviedb.org/search?query=" + query});
};
  
chrome.contextMenus.create({
  title: "Juice This Movie",
  contexts:["selection"],
  onclick: searchTMDB
});
// let url = '';
// chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//   url = tabs[0].url;
//   console.log(url)
// });

var url = ''

