let id = location.href.split('=')[1];
let root = document.getElementById('root');
let credits = document.getElementById('credits');
let video = document.getElementById('video');
let loader = document.querySelector('.loderid') 
let popup = document.getElementById('popup')
const API_KEY = "9b702a6b89b0278738dab62417267c49";
let img_url_original = "https://image.tmdb.org/t/p/original";
let img_url = "https://image.tmdb.org/t/p/w500";
let isOpen = false



fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(movie => setBackground(movie));

function setBackground(movie) {
    root.style.backgroundImage = `url(${img_url_original + movie.backdrop_path})`;

    root.innerHTML += `
        <div class="blachk">
            <img class='img' src="${img_url + movie.poster_path}" />
        </div>
        <div class="blachk2">
     <div class='logo'>
      <h1 class='h1'>${movie.title}</h1>
      <h1 class='taretiv'>${movie.release_date}</h1>
      </div>
            <p>${movie.overview}</p></div>
    `;
}




fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => aktiori(data.cast));





function aktiori(arr) {
    arr.forEach((elm) => {
        if (elm.profile_path) {
            credits.innerHTML += `
                <div class='aktior_cart'>
                    <img class='credit_img' src='${img_url + elm.profile_path}' alt='${elm.name}' />
                    <p>${elm.name}</p>
                </div>
            `;
        }
    });
}



fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => printVideo(data.results));


function printVideo(videos) {
    video.innerHTML = '';

    videos.forEach(elm => {
        if (elm.site === "YouTube") {
            video.innerHTML += `
                <div class="video_box" onclick='popupp("${elm.key}", "${elm.name}")'>
                <div class='position'></div>
                    <iframe width="300" height="200" 
                        src="https://www.youtube.com/embed/${elm.key}"
                        frameborder="0" >
                    </iframe>
                    <p>${elm.name}</p>
                </div>
            `;
        }
    });


}


function popupp(key, name) {
    popup.style.display = 'flex';
    popup.innerHTML = `
        <div class="video_popup_content" >
        <div class='x'><button class='buttonn' onclick="closePopup()">X</button></div>
            <iframe width="560" height="315"
                src="https://www.youtube.com/embed/${key}"
                frameborder="0" allowfullscreen>
            </iframe>
            <h2>${name}</h2>
        </div>
    `;
}


function closePopup() {
    popup.addEventListener('click',()=>{
        popup.style.display='none'
        popup.innerHTML=''
    })
}


window.addEventListener('load',()=>{
    setTimeout(() => {
        loader.classList.add('loder_flex')
        setTimeout(()=>{
            loader.remove()
        },4500)
    },4500);
})
