var fnReg = {
    ready: function(){
      document.addEventListener("deviceready",fnReg.init,false);  
    },

    init: function(){      
        if(!fnReg.estaRegistrado())
            window.location.href='#registro';
        
        $('#validaRegistro').click(fnReg.registrar);
        $('#tomarFoto').click(capture.takePhoto);
    },
    
    estaRegistrado: function(){
        var usuario = window.localStorage.getItem("usuario");
        if(usuario == undefined || usuario =='')
            return false;
        else
            return true;
    },

    registrar: function(){
        var nom = $('#regNom').val();
        var mail = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#regFoto').data('foto');
        
        if (nom !='' && mail !='' && tel !='' && foto != undefined){
            //alert(nom + ' ' + mail + ' ' + tel);
            //window.location.href='#home';
            $.mobile.loading("show",{theme: 'b'});
            $.ajax({
              method: "POST",
              url: "http://carlos.igitsoft.com/apps/test.php",
              data: { nom: nom, mail: mail, tel:tel },
              error: function(jq,txt){
                  $.mobile.loading("hide");
                  alert(jq+txt);
              }
            }).done(function( msg ) {
                //alert('si entrao a' + URL);
                if(msg == 1 ){
                    ft.transfer(foto);
                }
              });
        }else
            alert('Todos los datos son requeridos');
    }
};

/**
var eje ={
    carga: function(){
        alert('carga!!!!!!!!!!!!!!!');
    }
};
*/

$(fnReg.ready);
