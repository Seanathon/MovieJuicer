searchTMDB = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "https://themoviedb.org/search?query=" + query});
  // window.open("popup.html", "extension_popup", "width=320,height=475,status=no,scrollbars=yes,resizable=no");
};
  
chrome.contextMenus.create({
  title: "Juice This Movie",
  contexts:["selection"],
  onclick: searchTMDB
});
