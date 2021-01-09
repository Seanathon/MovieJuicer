function getMovieTitle() {
  
    let currentTitle = document.querySelectorAll('.previewModal--player-titleTreatment-logo');
    if (currentTitle === undefined) { return; }
  
    let movieName = currentTitle[0].getAttribute('alt')
    
    console.log(movieName)
    // get movie data of current title and append to popup
    return movieName;
}

console.log('loaded')


// document.addEventListener('DOMContentLoaded', function() { 
if (window.sessionStorage !== "undefined") {
    var target = document.body;

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            window.setTimeout(getMovieTitle, 5);
        });
    });

    var config = {
        attributes: true,
        childList: true
        // characterData: true
    };
  observer.observe(target, config);
}

const movieTitle = getMovieTitle();
console.log(movieTitle)


