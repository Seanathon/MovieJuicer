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

// save movie name in local storage
function saveMovie(movie) {
  if (!movie) return 'No movie to save';
  chrome.storage.sync.set({'movie': movie})
}

// this is a listener that waits and listens for messages sent from other 
// scripts, when the message is sent with "setMovie" key, it will save it
// then when the popup or new tab loads. It will automatically look for 
// stored movie and use it.
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch(message.type) {
      case "setMovie":
        saveMovie(message.movie); 
        console.log('success');
        break;  
      default:
        console.error("Unrecognized message:", message);
    }
    
  }
);
