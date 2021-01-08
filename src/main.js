// f3a00745aef1f38d75739bbb768b6096
// https://api.themoviedb.org/3/movie/550?api_key=f3a00745aef1f38d75739bbb768b6096
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2EwMDc0NWFlZjFmMzhkNzU3MzliYmI3NjhiNjA5NiIsInN1YiI6IjVmZjdjNDYxYmJjYWUwMDA0MGFjYjg3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5Od9umOd10OLAQicSAnVQK2q1tfmjxEEFkFmslebdE4

// https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>
const searchMovies = (searchQuery) => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=f3a00745aef1f38d75739bbb768b6096&query=${searchQuery}`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    }
  })
    .then(respObj => respObj.json())
    .then(data => {
      const resultContainer = document.createElement('div')
      resultContainer.className = "search-result"

      const resultName = document.createElement('h1')
      resultName.id = "result-name"

      const image = document.createElement('img')
      image.id = "movie-poster"

      
      const container = document.querySelector('#results-container')

        
      for (let i = 0; i < data.results.length; i++) { 
        const resultContainer = document.createElement('div')
        resultContainer.className = "search-result"

        const resultName = document.createElement('h1')
        resultName.id = "result-name"

        const image = document.createElement('img')
        image.id = "movie-poster"

        
        const container = document.querySelector('#results-container')
        resultName.textContent = `${data.results[i].original_title}`;
        image.src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`
        
        resultName.append(image)
        container.append(resultName)
      };
			
    });
  
}

document.addEventListener('DOMContentLoaded', function() {
		
		let searchButton = document.querySelector('#searchbutton');
    
    searchButton.addEventListener('click', function() {
        const searchQuery = document.querySelector('#searchbar').value;

        searchMovies(searchQuery);
	  });
	// fetch data from URL
	// this URL accesses the movie db's search function 
	
	// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher

	// this will return a few fields, one of which is results which has an array of movies

	// first movie will probably be it, we'll want the grab the ID of that movie

	// fetch from API with movie ID

	// respond with an object of all the movie details 
});
