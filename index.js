var inp = document.querySelector("input");

var form = document.querySelector("form");
var main = document.querySelector(".main");

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
movie(APIURL);
function movie(URL) {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => fun_store(data.results));
}

function fun_store(data) {
  main.innerHTML = "";

  data.forEach((e, i) => {
    var title = e.original_title;
    var vote = e.vote_average;
    var overview = e.overview;
    var poster = IMGPATH + e.poster_path;

    var card = document.createElement("div");
    card.className = "for_cards";
    main.appendChild(card);

    card.innerHTML = `<img
        src="${poster}"/>
        <h1>${title}</h1>
        <div class="${Votecolor(vote)}" id="for_votes">${vote}</div>
        <div class="for_overview"><strong>Overview :<br><br></strong>${overview}</div>`;
  });
}
function Votecolor(v) {
  if (v >= 7) {
    return "green";
  }
  if (v >= 6) {
    return "red";
  }
  if (v >= 5) {
    return "yellow";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var s = inp.value;
  console.log(s);
  if (s) {
    movie(SEARCHAPI + s);
    console.log("yes");
  }
});
