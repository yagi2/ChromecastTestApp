function onError(){
    console.log("Error");
    document.getElementById('message').innerHTML = "Error";
}

window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
    if (loaded) {
        initializeCastApi();
    }
    else {
        onError;
    }
}

initializeCastApi = function() {
    var applicationID = "24B9E7F7";
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest, function(){}, function(){});

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function onInitSuccess() {
    document.getElementById("castButton").disabled = false;
}

function cast() {
    var url = document.getElementById("url").value;
    var mediaType = document.getElementById("mediaType").value;
    var title = document.getElementById("title").value;
    var subtitle = document.getElementById("subtitle").value;
    var imageURL = document.getElementById("image").value;
    

    if (!url) return;
    if (!mediaType) return;
    if (imageURL) var image = new chrome.cast.Image(imageURL);
        

    chrome.cast.requestSession(function (session) {
        var mediaInfo = new chrome.cast.media.MediaInfo(url, mediaType);
        
        mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
        
        if (title) mediaInfo.metadata.title = title;
        if (subtitle) mediaInfo.metadata.subtitle = subtitle;
        if (imageURL) mediaInfo.metadata.images = [image];
    
        var request = new chrome.cast.media.LoadRequest(mediaInfo);

        request.autoplay = true;

        console.log("URL: " + url + "\n" +
                    "MediaType: " + mediaType + "\n" +
                    "Title: " + title + "\n" +
                    "SubTitle: " + subtitle + "\n" +
                    "ImageURL: " + imageURL + "\n" +
                    "Image: " + image + "\n");

        session.loadMedia(request, function(){}, onError)
    }, onError);
}