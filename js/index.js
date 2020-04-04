const API_KEY = "";
var page = 10;
var data2;
let searchTerm;

function fetchVideos( searchTerm ){
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${API_KEY}&maxResults=10`;
    let settings = {
        method : 'GET'
    };
    fetch(url, settings)
        .then( response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON => {
            displayResults(responseJSON);
        })
        .catch( err => {
            console.log(err);
        });
}

function displayResults( data ){
    console.log(data);
    len = data.items.length;
    let results = document.querySelector('.results');
    results.innerHTML = "";
    for(let i = 0; i < page; i++){
        results.innerHTML += `
            <div class="video">
                <a class="link" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">${data.items[i].snippet.title}</a>
                <br>
                <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
                    <img src="${data.items[i].snippet.thumbnails.medium.url}" />
                </a>
            </div>
        `;
    }
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${API_KEY}&q=${searchTerm}&maxResults=10&pageToken=${data.nextPageToken}`;
    let settings = {
        method : 'GET'
    };
    fetch(url, settings)
        .then( response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then ( responseJSON => {
            data2 = responseJSON;
        })
        .catch( err => {
            console.log(err);
        });
    results.innerHTML += `
        <button class="nextBtn" type="button" onclick="displayNxtPage()">
            <span>
                Next page
            </span>
        </button>
    `;
}

function displayNxtPage(){
    console.log(data2);
    let results = document.querySelector('.results');
    for(let i = 0; i < page; i++){
        results.innerHTML += `
            <div class="video">
                <a class="link" href="https://www.youtube.com/watch?v=${data2.items[i].id.videoId}" target="_blank">${data2.items[i].snippet.title}</a>
                <br>
                <a href="https://www.youtube.com/watch?v=${data2.items[i].id.videoId}" target="_blank">
                    <img src="${data2.items[i].snippet.thumbnails.medium.url}" />
                </a>
            </div>
        `;
    }
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${API_KEY}&q=${searchTerm}&maxResults=10&pageToken=${data2.nextPageToken}`;
    let settings = {
        method : 'GET'
    };
    fetch(url, settings)
        .then( response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then ( responseJSON => {
            data2 = responseJSON;
        })
        .catch( err => {
            console.log(err);
        });
    results.innerHTML += `
    <button class="nextBtn" type="button" onclick="displayNxtPage()">
        <span>
            Next page
        </span>
    </button>
    `;
}

function watchForm(){
    event.preventDefault();
    searchTerm = document.querySelector('#searchTerm').value;
    fetchVideos(searchTerm);
}