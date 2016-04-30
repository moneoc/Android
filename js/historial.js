var historial = {
    pr: null,
    di: null,
    th: null,    
    db: null, //variable de base de datos
    
    guardarHistorial: function(pr, di, th){
        almacen.pr = pr;
        almacen.di = di;
        almacen.th = th; 
        
        //objeto de la base de datos
        almacen.db = window.openDatabase("hotelApp", "1.0", "HotelApp Storage", 20000);
        //transaccion
        almacen.db.transaction(historial.hacerHistorial, historial.error, historial.historialGuardado);
    },
    hacerHistorial: function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS historial (pr, di, th)");
        tx.executeSql("INSERT INTO historial(pr, di, th) VALUES ('" + historial.pr + "','" + historial.di + "','" + historial.th + "')");
    },
    error: function(){
        alert("Error al acceder a la Base de Datos");
    },
    historialGuardado: function(){
        navigator.notification.alert("Historial Guardado", null, "Felicidades", "Aceptar");
    }
}