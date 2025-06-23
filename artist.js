  let id = location.href.split('=')[1];
  const API_KEY = "9b702a6b89b0278738dab62417267c49";
  let root = document.getElementById('root');
  let movies = document.getElementById('movies')
  let loader = document.querySelector('.loderid')

  fetch(`https://api.themoviedb.org/3/credit/${id}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(res => {
      person(res);
    });

  function person(data) {
    if (data.media && data.media.backdrop_path) {
      root.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.media.backdrop_path})`;
      root.style.backgroundSize = "cover";
      root.style.backgroundPosition = "center";
    } else {
      alert("ERROR IMG");
    }

    if (data.person && data.person.profile_path) {
      root.innerHTML += `
        <div class='blachk'>
          <img class='img' src='https://image.tmdb.org/t/p/w500${data.person.profile_path}' alt='Profile Image' />
        </div>
        <div class='blachk2'>
          <h1>${data.person.name}</h1>
          <h3>Original Name ${data.person.original_name}</h3>
        <div class='info'>
          <p class="p">${data.job} <span class='span3' >(${data.department || ""}</span> )</p>
          <p class="p">Abult <span class='span2'>${data.person.adult}</span> </p>
          <p class="p">popularity  <span class='span'>${data.person.popularity}</span> </p>
          </div>
        </div>
      `;
    }
  }


  fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(res => printMovie(res));



  function printMovie(arr) {
    arr.cast.forEach(elm => {
      movies.innerHTML += `
      <a href="single.html?id=${elm.id}">
        <div class="card" id="card">
      <div class="content">
          <img class="imgsss" src="https://image.tmdb.org/t/p/w500${elm.backdrop_path}" alt="${elm.original_title} /"
      </div>
          </div>
          </a>

        `
    });
  }



  window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('loder_flex')
        setTimeout(() => {
            loader.remove()
        }, 2000)
    }, 2000);
})



