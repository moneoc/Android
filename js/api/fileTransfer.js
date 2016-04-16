//fileTransfer.js

var ft ={
    //obj: new FileTransfer(),
    win: function(r){
        if (r.response == 1){
            window.localStorage.setItem("usuario",$('#regNom').val());
            window.location.href= '#home';
        }
    },
    fail: function(error) {
    // error.code == FileTransferError.ABORT_ERR
    alert("An error has occurred: Code = " + error.code);
    },
    transfer: function(fileURL){
        alert(fileURL);
        var options = new FileUploadOptions();
        options.fileKey="foto"; //nombre del lado donde se recive en este caso del arhivo fileURL
        options.fileName="fotoCapturada";
        options.mimeType="image/jpeg";
        
        var ft2 = new FileTransfer();
        ft2.upload(fileURL,"http://carlos.igitsoft.com/apps/test.php", ft.win, ft.fail, options);
    }
};