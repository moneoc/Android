var fn = {
    ready: function(){
        document.addEventListener("deviceready", fn.init, false);
    },
    init: function(){
        //funcionalidades para el registro
        if(!fn.estaRegistrado())
            window.location.href = '#registro';
        
        $('#registro div[data-role=footer] a').tap(fn.regitrar);
        $('#tomarFoto').tap(capture.takePhoto);
        //funcionalidades para reservar
        $('#nr1 div[data-role=navbar] a:eq(0)').tap(fn.siguientePaso);
        $('#nr2 ul[data-role=listview] a').tap(fn.seleccionaHabitacion);
        $('#nr2 div[data-role=navbar] a:eq(0)').tap(fn.obtenerReserva);
    },
    //***********funciones de registro**********************
    estaRegistrado: function(){
        var usr = window.localStorage.getItem("user");
        if (usr == undefined || usr == '')
            return false;
        else 
            return true;
    },
    regitrar: function(){
        var nom = $('#regNom').val();
        var mail = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#regFoto').data('foto');
    
        if (nom != '' && mail != '' && tel != '' && foto != undefined)
            {
                $.mobile.loading("show",{
                    theme: 'b'
                });
                $.ajax({
                  method: "POST",
                  url: "http://carlos.igitsoft.com/apps/test.php",
                  data: { nom: nom, mail: mail, tel: tel },
                    error: function(jq,txt){
                        alert(jq+txt);
                    }
                }).done(function( msg ) {
                    if(msg == 1)
                        ft.transfer(foto);
                });
            }else
            alert('Todos los campos son requeridos');
    },
    //***********funciones de reserva**********************
    per: '',
    dia: '',
    th: '',
    siguientePaso: function(){
        fn.per = $('#nrPer').val();
        fn.dia = $('#nrDia').val();
    
        if(fn.per != '' && fn.dia != '')
            window.location.href = "#nr2";
        else
            navigator.notification.alert("Todos los campos son requeridos", null, "Error al llenar", "Aceptar");
    },
    seleccionaHabitacion: function(){
        $(this).parent().parent().find('a').css('background-color','transparent');
        $(this).css('background-color','#00ff00');
        fn.th = $(this).parent().index();
    },
    obtenerReserva: function(){
        if (fn.th != ''){
            if(navigator.connection.type != Connection.NONE)
                {
                    //Enviar a servidor
                    server.sincronizar(fn.per, fn.dia, fn.th);
                    
                }
                
            else
                {
                    //Guadar localmente
                    almacen.guardarReserva(fn.per, fn.dia, fn.th);
                }
        }
        else
            navigator.notification.alert("Debe seleccionar tipo de habitacion", null, "Error al llenar", "Aceptar");
    }
};

$(fn.ready);