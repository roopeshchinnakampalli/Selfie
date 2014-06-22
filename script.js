/*global console*/
(function () {
    "use strict";
    var streaming = false,
        video = document.querySelector('#video'),
        canvas = document.querySelector('#canvas'),
        photo = document.querySelector('#photo'),
        startbutton = document.querySelector('#startbutton'),
        savebutton = document.querySelector('#savebutton'),
        message = document.querySelector('#msg'),
        supported = document.querySelector('#supported'),
        notsupported = document.querySelector('#notSupported'),
        cancelled = document.querySelector('#cancelled'),
        width = 320,
        height = 0;

    navigator.getMedia = (navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia ||
         navigator.msGetUserMedia);
    
    if (navigator.getMedia === undefined) {
        notsupported.style.display = "block";
        return;
    }
    
    

    navigator.getMedia({
        video: true,
        audio: false
    },
        function (stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            
            video.play();
            supported.style.display = "block";
        },
         function (err) {
            cancelled.style.display = "block";
        }
        );
    
    
    

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            while (video.videoHeight <= 0) {
                height = video.videoHeight / (video.videoWidth / width);
            }
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    function takepicture() {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        message.style.display = "block";
    }

    startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
    }, false);
}());