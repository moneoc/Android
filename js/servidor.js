var server = {
    sincronizar: function(pr, di, th){
        if (pr != '' && di != '' && th != '')
        {
             $.mobile.loading("show",{
                  theme: 'b'
             });
             $.ajax({
             method: "POST",
             url: "http://carlos.igitsoft.com/apps/test.php",
             data: {  personas: pr , dia: di, tipo: th},
             error: function(jq,txt){
                  navigator.notification.alert("Error al sincronizar", null, "Error", "Aceptar");
             }
            }).done(function( msg ) {
                 if(msg == 1)
                     {
                        navigator.notification.alert("Reserva Sincronizada", null, "Felicidades", "Aceptar");
                         historial.guardarHistorial(fn.per, fn.dia, fn.th);
                        $.mobile.loading("hide");
                     }
                 else
                     navigator.notification.alert("Error al sincronizar", null, "Error", "Aceptar");
            });
        }else
            alert('Todos los campos son requeridos');
    }        
};