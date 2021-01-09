// f3a00745aef1f38d75739bbb768b6096
// https://api.themoviedb.org/3/movie/550?api_key=f3a00745aef1f38d75739bbb768b6096
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2EwMDc0NWFlZjFmMzhkNzU3MzliYmI3NjhiNjA5NiIsInN1YiI6IjVmZjdjNDYxYmJjYWUwMDA0MGFjYjg3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5Od9umOd10OLAQicSAnVQK2q1tfmjxEEFkFmslebdE4

// https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>

const apiKey = 'f3a00745aef1f38d75739bbb768b6096';
const popup = document.querySelector('.popup-container');
const body = document.querySelector('body');

const buildResults = data => {
		
	for (let i = 0; i < data.results.length; i++) { 
		const resultContainer = document.createElement('div')
		resultContainer.className = "search-result"
		resultContainer.id = data.results[i].id

		const resultName = document.createElement('h1')
		resultName.id = "result-name"

		const image = document.createElement('img')
		image.id = "movie-poster"

		
		const container = document.querySelector('#results-container');

		if (data.results[i].media_type === 'tv') {
			resultName.textContent = `${data.results[i].name}`;
		}
		else {
			resultName.textContent = `${data.results[i].original_title}`;
		}

		image.src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`
    // resultContainer.addEventListener('click', function() {
    //   window.open(`https://themoviedb.org/movie/${data.results[i].id}-${data.results[i].original_title}`)
    // })
		resultContainer.append(image)
		resultContainer.append(resultName)
		container.append(resultContainer)
  };
  
}

const buildSingleResult = data => {
	const image = document.querySelector('.popup-poster');
	image.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

	const bgImage = document.querySelector('.popup-bg');
	bgImage.src = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop_path}`

	const title = document.querySelector('.title');
	title.innerHTML = data.title;

	const overview = document.querySelector('.overview');
	overview.innerHTML = data.overview;
	
	const year = document.querySelector('.year');
	year.innerHTML = data.release_date.split('-')[0];

	const genre = document.querySelector('.genre');
	genre.innerHTML = data.genres[0].name;
	
	const voteAvg = document.querySelector('.vote-avg');
	voteAvg.innerHTML = `${data.vote_average} <span class="vote-count">(${data.vote_count})</span>`;
  
  
  // const infoButton = document.querySelector('#tmdb-button')
  image.addEventListener('click', function() {
    window.open(`https://themoviedb.org/movie/${data.id}-${data.original_title}`)
  })

}

const moviesOnLoad = (key) => {
	// options include: now_playing, top_rated, popular
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    }
  })
    .then(respObj => respObj.json())
    .then(data => {
			// console.log(data);
			buildResults(data);
			newResultsListener();
		})
		.catch(error => {
			console.log(error);
		});
  
}

const searchMovies = (searchQuery, key) => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    }
  })
    .then(respObj => respObj.json())
    .then(data => {
			// console.log(data);
			clearResults();
			buildResults(data);
			newResultsListener();
		})
		.catch(error => {
			console.log(error);
		});
}

const searchAndIDMovie = (searchQuery, key) => {
	fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    }
  })
    .then(respObj => respObj.json())
    .then(data => {
			viewTitle(data.results[0].id, key)
		})
		.catch(error => {
			console.log(error);
		});
}

const viewTitle = (id, key) => {
	fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    }
  })
    .then(respObj => respObj.json())
    .then(data => {
			// console.log(data);
			buildSingleResult(data);
			popup.classList.remove('hide');
			body.classList.add('lock-scroll')
		})
		.catch(error => {
			console.log(error);
		});
		
}

const clearResults = () => {
	const container = document.querySelector('#results-container');
	container.innerHTML = '';
}

function newResultsListener() {
	setTimeout( function() {
		const searchResults = document.getElementsByClassName('search-result');
		for(const result of searchResults) {
			result.removeEventListener('click', e => {
				// const id = result.getAttribute("id");
				// viewTitle(id, apiKey);
			})
			result.addEventListener('click', e => {
				const id = result.getAttribute("id");
				viewTitle(id, apiKey);
			})
		}
  }, 1000);
  
}

document.addEventListener('DOMContentLoaded', function() {
		
	// Movie is found using script in ratings.js then
	// Then retrieve movie from Chrome Storage  (saved on menu.js:27)
		chrome.storage.sync.get(['movie'], function(data) {
			moviesOnLoad(apiKey);
			if (data.movie) {
				searchAndIDMovie(data.movie, apiKey);
				chrome.storage.sync.clear();
			}
		});
		
		const logo = document.querySelector('#logo');
		const searchButton = document.querySelector('#searchbutton');
		const searchQuery = document.querySelector('#searchbar');
		const openSearchBar = document.querySelector('.bx-search');
		const closeIcon = document.querySelector('.bx-x');
		
		openSearchBar.addEventListener('click', function() {
			this.classList.add('hide');
			logo.classList.add('hide');
			searchQuery.classList.add('show');
		});

    searchButton.addEventListener('click', function() {
        searchMovies(searchQuery.value, apiKey);
		});

		// if you press enter in the search bar, it'll submit your search
		searchQuery.addEventListener('keydown', e => {
			if (e.keyCode === 13) searchMovies(searchQuery.value, apiKey);
		});

		closeIcon.addEventListener('click', e => {
			popup.classList.add('hide');
			body.classList.remove('lock-scroll')
		});
		
    
    
	// fetch data from URL
	// this URL accesses the movie db's search function 
  
	// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher

	// this will return a few fields, one of which is results which has an array of movies

	// first movie will probably be it, we'll want the grab the ID of that movie

	// fetch from API with movie ID

	// respond with an object of all the movie details 
});

