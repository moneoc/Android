var almacen = {
    pr: null,
    di: null,
    th: null,    
    db: null, //variable de base de datos
    
    guardarReserva: function(pr, di, th){
        almacen.pr = pr;
        almacen.di = di;
        almacen.th = th; 
        
        //objeto de la base de datos
        almacen.db = window.openDatabase("hotelApp", "1.0", "HotelApp Storage", 20000);
        //transaccion
        almacen.db.transaction(almacen.hacerReserva, almacen.error, almacen.reservaGuardada);
    },
    hacerReserva: function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS reservas (pr, di, th)");
        tx.executeSql("INSERT INTO reservas(pr, di, th) VALUES ('" + almacen.pr + "','" + almacen.di + "','" + almacen.th + "')");
    },
    error: function(){
        alert("Error al acceder a la Base de Datos");
    },
    reservaGuardada: function(){
        navigator.notification.alert("Reserva guardada en espera de sincronización", almacen.leerReservas, "Felicidades", "Aceptar");
    },
    leerReservas: function(){
        almacen.db.transaction(almacen.consultaReserva, almacen.error, null);
    },
    consultaReserva: function(tx){
        tx.executeSql("SELECT * FROM reservas", [], function(tx2, t){//en t obtenemos la tabla
            for(i = 0; i < t.rows.length; i++)
                {
                    navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n" + "Dias: " + t.rows.item(i).di + "\n" + "Tipo de habitación: " + t.rows.item(i).th, function(btn){
                        if(btn == 1)
                            navigator.vibrate(600);
                        if(btn == 2)
                            navigator.notification.beep(1);
                    }, "Tabla Reservas", "Vibrar, Sonar, Cancelar");
                }
        });
    }
}