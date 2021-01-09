let movieName = '';

function getMovieTitle() {
    let currentTitle = document.querySelectorAll('.previewModal--player-titleTreatment-logo');
    
    if (currentTitle[0].getAttribute('alt')) {
        movieName = currentTitle[0].getAttribute('alt')
    } else {
        currentTitle = undefined;
    }

    if (currentTitle === undefined) { return; }
    console.log(movieName)
    return movieName;
    // get movie data of current title and append to popup
}

console.log('loaded')

if (window.sessionStorage !== "undefined") {
    var target = document.body;

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function(mutation) {
            window.setTimeout(getMovieTitle, 5);
        });
    });

    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };
  observer.observe(target, config);
}

getMovieTitle();
console.log(movieName)


