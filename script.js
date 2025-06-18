const API_KEY = "9b702a6b89b0278738dab62417267c49"
let root = document.getElementById('root')
let searchInp = document.getElementById('searchInp')
let end = document.getElementsByClassName('end')
let categories = document.getElementById('categories')
let loader = document.querySelector('.loderid')
let img_url_original = "https://image.tmdb.org/t/p/original"
let img_url = "https://image.tmdb.org/t/p/w500"

let genres = []


fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY)
    .then(res => res.json())
    .then(res => printMovies(res.results)
    )



function printMovies(arr) {
    root.innerHTML = ''
    arr.forEach((elm) => {
        root.innerHTML += `
        <a href="single.html?id=${elm.id}">
        <div class="movie-cart">
            <div class='reting'>
            <h3>${elm.title}</h3>
                <div class='scuare_reting'>
                <p>${elm.vote_average}</p>
                </div>
            </div>
            <img class='img' src=${img_url + elm.poster_path} />
            <p class='p'>${elm.title}</p>
        </div>
        </a>`

    })

    const color = document.querySelectorAll('.scuare_reting');
    arr.forEach((elm, index) => {
        const square = color[index];
        if (elm.vote_average > 7) {
            square.style.backgroundColor = 'green';
        } else if (elm.vote_average > 5) {
            square.style.backgroundColor = 'orange';
        } else {
            square.style.backgroundColor = 'red';
        }
    });

}






let timerId

searchInp.addEventListener('input', () => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInp.value}`)
            .then(res => res.json())
            .then(res => printMovies(res.results));
        if (searchInp.value.trim() === '') {
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY)
                .then(res => res.json())
                .then(res => printMovies(res.results)
                )
        }
    }, 800)

})




window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('loder_flex')
        setTimeout(() => {
            loader.remove()
        }, 2000)
    }, 2000);
})


fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(res => {
        res.genres.forEach(elm => {
            categories.innerHTML += `
            <button onclick="getGenres(${elm.id}) ">
              <span class="text">${elm.name}</span>
            </button>
      `;
        });
    });






function getGenres(id) {
    
    if (genres.includes(id)) {
        genres = genres.filter((e) => e !== id)
    }
    else {
        genres.push(id)
    }
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY + `&with_genres=${genres}`)
    .then(res => res.json())
    .then(res => printMovies(res.results)
)
        
}
