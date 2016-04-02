//fileTransfer.js

// !! Assumes variable fileURL contains a valid URL to a text file on the device,
//    for example, cdvfile://localhost/persistent/path/to/file.txt

var ft ={
    obj: new FileTransfer(),
    win: function(r){
        if (r.response ==1){
            window.localStorage.setItem("user",fnReg.init,false);
            window.location.href('#home');
        }
        console.log("Code: " + r.responseCode);
        console.log("Resopnse: " + r.response);
        console.log("Send: " + r.bytesSend);
    },
    fail: function(error) {
    // error.code == FileTransferError.ABORT_ERR
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
    },
    transfer: function(){
        var options = new FileUploadOptions();
        options.fileKey="foto"; //nombre del lado donde se recive en este caso del arhivo fileURL
        options.fileName="fotoCapturada";
        options.mimeType="image/jpeg";
        
        ft.upload(fileURL, encodeURI("http://carlos.igitsoft.com/apps/test.php"), win, fail, options);
        ft.abort();
    }
};