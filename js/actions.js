var fnReg ={
    ready:function(){
      document.addEventListener("deviceready",fnReg.init,false);  
    },
    init: function(){
        if(!fnReg.estaRegistrado())
            window.location.href="#registro";
        $('#validaRegistro').click(fnReg.registrar);
        $('#tomarFoto').click(capture.takePhoto);
    },
    //funcion de registro
    estaRegistrado: function(){
        var usr = window.localStorage.getItem("user");
        if(usr == undefined || usr ='')
            return false;
        else
            return true;
    },
    registrar: function(){
        var nom = $('#regNom').val();
        var mail = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#regFoto').data('foto');
        
        if (nom !='' && mail !='' && tel !='' && foto != undefined)
            //alert(nom + ' ' + mail + ' ' + tel);
            //window.location.href='#home';
            $.ajax({
              method: "POST",
              url: "http://carlos.igitsoft.com/apps/test.php",
              data: { nom: nom, mail: mail, tel:tel }
            }).done(function( msg ) {
                if(msg ==1 ){
                    ft.transfer(foto)
                }
              });
        else
            alert('Todos los datos son requeridos');
    }
};
$(fnReg.ready);