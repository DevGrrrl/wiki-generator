// var randomWikiObj;

// var randomWikiObj;
var titlesArr = [];
var titles = document.getElementsByClassName('titles');

for (var i =0; i<titles.length; i++){
  titlesArr.push(titles[i]);
}
console.log(titlesArr)



var title = document.getElementById('heading');
var search = document.getElementById('search');
var submit = document.getElementById('submit');
var results = document.getElementById('results');
var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var box3 = document.getElementById('box3');
var box4 = document.getElementById('box4');
var box5 = document.getElementById('box5');
var box6 = document.getElementById('box6');
var box7 = document.getElementById('box7');
var box8 = document.getElementById('box8');
var box9 = document.getElementById('box9');
var box10 = document.getElementById('box10');

var resultextract1 = document.getElementById('resultextract1');
var resultextract3 = document.getElementById('resultextract3');
var resultextract4 = document.getElementById('resultextract4');
var resultextract5 = document.getElementById('resultextract5');
var resultextract6 = document.getElementById('resultextract6');
var resultextract7 = document.getElementById('resultextract7');
var resultextract8 = document.getElementById('resultextract8');
var resultextract9 = document.getElementById('resultextract9');
var resultextract10 = document.getElementById('resultextract10');


var result1 = document.getElementById('result1');
var result3 = document.getElementById('result3');
var result2 = document.getElementById('result2');
var result4 = document.getElementById('result4');
var result5 = document.getElementById('result5');
var result6 = document.getElementById('result6');
var result7 = document.getElementById('result7');
var result8 = document.getElementById('result8');
var result9 = document.getElementById('result9');
var result10 = document.getElementById('result10');


var resultTitle1 = document.getElementById('resultTitle1');
var resultTitle2 = document.getElementById('resultTitle2');
var resultTitle3 = document.getElementById('resultTitle3');
var resultTitle4 = document.getElementById('resultTitle4');
var resultTitle5 = document.getElementById('resultTitle5');
var resultTitle6 = document.getElementById('resultTitle6');
var resultTitle7 = document.getElementById('resultTitle7');
var resultTitle8 = document.getElementById('resultTitle8');
var resultTitle9 = document.getElementById('resultTitle9');
var resultTitle10 = document.getElementById('resultTitle10');

var random = document.getElementById('random');
var resultsArrTitles = [];
var resultsArrId = [];
var wikiObj;
var randomObj;
var string = '';
var url;
var clicked = false;
// var searchTerm = search.split(' ').join('+');
var searchTerm = '';
var searchUrl;


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
  console.log(searchUrl);
  searchWiki(searchUrl);

}

function resultsArrays(wikiObj) {

  resultsArrTitles = [];
  resultsArrId = [];
  for (var i = 0; i < 10; i++) {
    var id = wikiObj.query.pages[i].pageid;
    var tit = wikiObj.query.pages[i].title;
    resultsArrTitles.push(tit);
    console.log(resultsArrTitles);
    resultsArrId.push(id);
    console.log(resultsArrId);

  }

  //replace with loop:
  resultTitle1.innerText = resultsArrTitles[0];
  result1.href = "https://en.wikipedia.org/?curid=" + resultsArrId[0];
  resultextract1.innerText = wikiObj.query.pages[0].extract;
  box1.className = "box";

  resultTitle2.innerText = resultsArrTitles[1];
  result2.href = "https://en.wikipedia.org/?curid=" + resultsArrId[1];
  resultextract2.innerText = wikiObj.query.pages[1].extract;
  box2.className = "box";

  resultTitle3.innerText = resultsArrTitles[2];
  result3.href = "https://en.wikipedia.org/?curid=" + resultsArrId[2];
  resultextract3.innerText = wikiObj.query.pages[2].extract;
  box3.className = "box";

  resultTitle4.innerText = resultsArrTitles[3];
  result4.href = "https://en.wikipedia.org/?curid=" + resultsArrId[3];
  resultextract4.innerText = wikiObj.query.pages[3].extract;
  box4.className = "box";

  resultTitle5.innerText = resultsArrTitles[4];
  result5.href = "https://en.wikipedia.org/?curid=" + resultsArrId[4];
  resultextract5.innerText = wikiObj.query.pages[4].extract;
  box5.className = "box";

  resultTitle6.innerText = resultsArrTitles[5];
  result6.href = "https://en.wikipedia.org/?curid=" + resultsArrId[5];
  resultextract6.innerText = wikiObj.query.pages[5].extract;
  box6.className = "box";

  resultTitle7.innerText = resultsArrTitles[6];
  result7.href = "https://en.wikipedia.org/?curid=" + resultsArrId[6];
  resultextract7.innerText = wikiObj.query.pages[6].extract;
  box7.className = "box";

  resultTitle8.innerText = resultsArrTitles[7];
  result8.href = "https://en.wikipedia.org/?curid=" + resultsArrId[7];
  resultextract8.innerText = wikiObj.query.pages[7].extract;
  box8.className = "box";

  resultTitle9.innerText = resultsArrTitles[8];
  result9.href = "https://en.wikipedia.org/?curid=" + resultsArrId[8];
  resultextract9.innerText = wikiObj.query.pages[8].extract;
  box9.className = "box";

  resultTitle10.innerText = resultsArrTitles[9];
  result10.href = "https://en.wikipedia.org/?curid=" + resultsArrId[9];
  resultextract10.innerText = wikiObj.query.pages[9].extract;
  box10.className = "box";
}

function clearAll() {
  results.className = "results hidden";
}

function searchWiki(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // results.className = "results";
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
