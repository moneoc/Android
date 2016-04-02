//capture.js

var capture={
    success: function(mediaFiles){
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
        }
        $('#regFoto').attr('data-foto',path);
        $('#regFoto').html('<img src="'+ path +'" style="width=100%;">');
    },
    // capture error callback
    captureError: function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error','Cambio Nombre btn');
    },
    //start image capture
    takePhoto: function(){
        navigator.device.capture.captureImage(capture.success, capture.captureError, {limit:2});
    }
}