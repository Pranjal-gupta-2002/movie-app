const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'api_key=eb56f2c1c43c9cf3fde067fd156178c4&page=1'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const IMG_PATH ='https://image.tmdb.org/t/p/w500'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=eb56f2c1c43c9cf3fde067fd156178c4&query='
const main = document.querySelector('main')
const form = document.querySelector('form')
const search = document.querySelector('#search')


getMovies(API_URL)
async function getMovies(url){
    const resp = await fetch(url)
    const respData = await resp.json()
    console.log(respData)

    showMovie(respData.results)
    return respData
}
function showMovie(movie){
    main.innerHTML = ""
    movie.forEach((movie) => {
        const {poster_path,title,vote_average,overview} = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = 
       `
        <img src = "${IMG_PATH + poster_path}" alt="${title}"/>
        <div class="movie-info">
            <h3>${title}</h3>
            <span class = ${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        <div class= "overview">
            <h3>Overview</h3>
            ${overview}
        </div>`;
       main.appendChild(movieEl)
    });
    
}
function getClassByRate(vote){
    if(vote >= 8){
        return "green"
    }
    else if(vote >= 5){
        return "orange"
        return "orange"
    }
    else{
        return "red"
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const serachTerm = search.value
    if(serachTerm){
        getMovies(SEARCH_API + serachTerm)

        search.value = ''
    }

})