function getMovieTitle() {
  
    let currentTitle = document.querySelectorAll('.previewModal--player-titleTreatment-logo');
    if (currentTitle === undefined) { return; }
  
    let movieName = currentTitle[0].getAttribute('alt')
  
    console.log(movieName)
}

console.log('loaded')

getMovieTitle();