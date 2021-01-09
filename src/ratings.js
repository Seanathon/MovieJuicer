let movieName = '';
let startSeeking;

// Using this code because it runs on an interval until the Netflix preview 
// window is opened. Once it is, it sends the movie name to the background script
// in order to store in chrome's local storage. Then stops the interval check.

// Once you close out of the movie preview window on netflix, it starts the interval
// back up and the next one you open will store the movie and do the same thing.

// Open up console to see the movie name log you preview a movie's info

function startLooking() {
    startSeeking = setInterval(function(){ getMovieTitle() }, 1000);
}

function stopSeeking() {
    clearInterval(startSeeking);
}

function getMovieTitle() {
    let modal = document.querySelector('.playerModel--player__storyArt');
    let close = document.querySelector('.previewModal-close');
    if (modal) {
        movieName = modal.getAttribute('alt');
        stopSeeking();
        console.log(movieName);

        // sent message to menu.js with movie name in it which will save the movie
        chrome.runtime.sendMessage({'type': 'setMovie', 'movie': movieName});
        close.addEventListener('click', e => {
            startLooking();
        })
    } 
}

startLooking();






// function getMovieTitle() {
//     let currentTitle = document.querySelectorAll('.previewModal--player-titleTreatment-logo');
    
//     if (currentTitle[0].getAttribute('alt')) {
//         movieName = currentTitle[0].getAttribute('alt')
//     } else {
//         currentTitle = undefined;
//     }

//     if (currentTitle === undefined) { return; }
//     console.log(movieName)
//     return movieName;
//     // get movie data of current title and append to popup
// }

// console.log('loaded')

// if (window.sessionStorage !== "undefined") {
//     var target = document.body;

//     const observer = new MutationObserver(function (mutations) {
//         mutations.forEach(function(mutation) {
//             window.setTimeout(getMovieTitle, 5);
//         });
//     });

//     var config = {
//         attributes: true,
//         childList: true,
//         characterData: true
//     };
//   observer.observe(target, config);
// }

// getMovieTitle();
// console.log(movieName)

// if(movieTitle) {
//     chrome.runtime.sendMessage({movie: movieTitle}, function(response) {
//         console.log(response);
//     });
// }



