var fnReg = {
    ready: function(){
      document.addEventListener("deviceready",fnReg.init,false);  
    },

    init: function(){  
        //Funcionalidades para el registro
        if(!fnReg.estaRegistrado())
            window.location.href='#registro';
        
        //$('#validaRegistro').click(fnReg.registrar);
        //$('#tomarFoto').click(capture.takePhoto);
        $('#validaRegistro').tap(fnReg.registrar);
        $('#tomarFoto').tap(capture.takePhoto);
        
        //Funcionalidades para reservar
        $('#reservacion1 div[data-role=navbar] a:eq(0)').tap(fnReg.siguientePaso);
        $('#reservacion2 ul[data-role=listview] a').tap(fnReg.seleccionaHabitacion);
        $('#reservacion2 div[data-role=navbar] a:eq(0)').tap(fnReg.obtenerReservacion);
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
                if(msg == 1 ){
                    ft.transfer(foto);
                }
              });
        }else
            alert('Todos los datos son requeridos');
    },
    per: '',
    dia: '',
    th: '',
    siguientePaso: function(){
        fnReg.per= $('#numPer').val();
        fnReg.dia=$('#numDias').val();
        if (fnReg.per != '' && fnReg.dia != '')
            window.location.href='#reservacion2';
        else
            //alert('todos!!');
            navigator.notification.alert("Todos los campos son requeridos",null,"Error al llenar","Aceptar");
    },
    seleccionaHabitacion: function(){
        $(this).parent().parent().find('a').css('background-color','transparent');
        $(this).css('background-color','green');
        fnReg.th = $(this).parent().index();
        alert(fnReg.th);
    },
    obtenerReservacion: function(){
        if (fnReg.th != ''){
            if(navigator.connection.type != Connection.NONE)
                //enviar al servidor
                navigator.notification.alert("enviar al servidor",null,"Error al llenar","Aceptar");
            else
                //almacenar localmente
                navigator.notification.alert("almacenar localmente",null,"Error al llenar","Aceptar");
                
                    
        }else
            //alert('Debe seleccionar tipo de habitacion');
            navigator.notification.alert("Debe seleccionar tipo de habitacion",null,"Error al llenar","Aceptar");
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
