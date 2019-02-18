var tracks, players = [];

document.addEventListener("DOMContentLoaded", function (event){
    //loads stream on page load
    //load();
    //play button
    document.getElementById("playBtn").addEventListener("click", function () {
        playTrack(currentSong);
        console.log("test")
    });

    //pause button
    document.getElementById("pauseBtn").addEventListener("click", function () {
        players[currentSong].pause();
    });

    //stop button
    document.getElementById("stopBtn").addEventListener("click", function () {
        players[currentSong].pause();
        players[currentSong].seek(0);
    });

    //next button
    document.getElementById("forwardBtn").addEventListener("click", function () {
        currentSong++;
        if (currentSong >= tracks.length) {
            currentSong = 0;
        }
        playTrack(currentSong);
    });

    //previous button
    document.getElementById("rewindBtn").addEventListener("click", function () {
        currentSong--;
        if (currentSong < 0) {
            currentSong = tracks.length - 1;
        }
        playTrack(currentSong);
    });

});

SC.initialize({
    client_id: '95f22ed54a5c297b1c41f72d713623ef'
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("content loaded")
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault()
        console.log(event)
        SC.get("/tracks", {
            // q: "holy grail"
            q: document.getElementById("input").value
        }).then(function (response) {
            console.log(response);
            tracks = response;
            document.getElementById("description").innerHTML = tracks[currentSong].title = tracks[currentSong].genre + tracks[currentSong].permalink + tracks[currentSong].description
            document.getElementById("artwork").src = tracks[currentSong].artwork_url || "http://" + q + ".jpg.to"
            playTrack(currentSong);
        });
    });
})

var currentSong = 0;

function playTrack(songId) {
    document.getElementById("description").innerHTML = tracks[currentSong].title = tracks[currentSong].title

    if (!players[songId]) {
        SC.stream('/tracks/' + tracks[songId].id).then(function (player) {
            console.log(player);
            players[songId] = player;
            players[songId].play();
        });
    } else {
        players[songId].play();
    }
}

function stopAudio2() {
    players[currentSong].seek(0);
    players[currentSong].pause();
}

function playAudio2() {
    players[currentSong].play();
};

function pauseAudio2() {
    players[currentSong].pause();
}

function forwardAudio2() {
    StopAudio2();
    currentSong += 1;
    players[currentSong].play();
};

function rewindAudio2() {
    stopAudio2();
    currentsong = -1;
    players[currentSong].play();
    currentSong
}

//volume slider
function SetVolume(val) {
    var player = tracks[currentSong];
    player.volume = val / 100;
    console.log('After:' + player.volume);
    players[currentSong].setVolume(player.volume);
}


