var title = document.getElementById('heading');
var search = document.getElementById('search');
var submit = document.getElementById('submit');
var results = document.getElementById('results');
var titles = document.getElementsByClassName('titles');
var extracts = document.getElementsByClassName('extracts');
var links = document.getElementsByClassName('links');
var random = document.getElementById('random');
var boxes = document.getElementsByClassName('boxes');

var titlesArr = [];
var extractsArr = [];
var linksArr = [];

var wikiObj;
var randomObj;
var string = '';
var url;
var clicked = false;
var searchTerm = '';
var searchUrl;


for (var i = 0; i < 10; i++) {
  titlesArr.push(titles[i]);
  extractsArr.push(extracts[i]);
  linksArr.push(links[i]);
}

function submitSearch() {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    searchTerm = search.value;
    string = '';
    search.value = '';
    setUrl(searchTerm);
  }, false);

}

submitSearch();

function setUrl(str) {
  searchUrl = "https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&utf8=1&prop=extracts&exintro=1&origin=*&exsentences=1&explaintext&format=json&gsrsearch=" +
    (str.split(' ').join('+') + '&format=json&origin=*');
  searchWiki(searchUrl);
}

//XMLHttpRequest

function searchWiki(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      wikiObj = JSON.parse(xhr.responseText);
      if (wikiObj.query === undefined) {
        alert('Results not found, try again');
        return;
      } else {
        resultsArrays(wikiObj)
      };
    }

  };

  xhr.open("GET", url, true);
  xhr.send();

}

function resultsArrays(wikiObj) {

  var resultsArrTitles = [];
  var resultsArrId = [];
  var resultsArrExt = [];

  for (var i = 0; i < 10; i++) {
    var id = wikiObj.query.pages[i].pageid;
    var tite = wikiObj.query.pages[i].title;
    var extr = wikiObj.query.pages[i].extract;
    resultsArrTitles.push(tite);
    resultsArrId.push(id);
    resultsArrExt.push(extr);

  }

  for (var j = 0; j < 10; j++) {
    titlesArr[j].innerText = resultsArrTitles[j];
    extractsArr[j].innerText = resultsArrExt[j];
    linksArr[j].href = "https://en.wikipedia.org/?curid=" + resultsArrId[j];
  }

  for (var i = 0; i < 10; i++) {
    boxes[i].className = "box boxes";

  }

}

//Random Page Request

function getRandom() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      randomObj = JSON.parse(xhr.responseText);
      var id = randomObj.query.pages;
      id = parseInt(Object.keys(id)[0]);
      url = "https://en.wikipedia.org/?curid=" + id;
      random.setAttribute("href", url);
    };
  }

  xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json&origin=*", true);
  xhr.send();
}

getRandom();

function randomEventListener() {

  random.addEventListener('click', function() {
    getRandom();
  }, false);

}

randomEventListener();
