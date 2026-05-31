document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('sunny-video');

    function goFullscreen() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }

    function startVideo() {
        video.play().then(function () {
            goFullscreen();
        }).catch(function () {
            video.muted = true;
            video.play().then(goFullscreen);
        });
    }

    if (video.readyState >= 2) {
        startVideo();
    } else {
        video.addEventListener('loadeddata', startVideo);
    }
});
