var fnReg ={
    init: function(){
        if(!fnReg.estaRegistrado())
            window.location.href="#registro";
        $('#validaRegistro').click(fnReg.registrar);
    },
    //funcion de registro
    estaRegistrado: function(){
        return false;
    },
    registrar: function(){
        var nom = $('#regNom').val();
        var mail = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#regFoto').data('foto');
        
        if (nom !='' && mail !='' && tel !='')
            //alert(nom + ' ' + mail + ' ' + tel);
            window.location.href('#home');
        else
            alert('Todos los datos son requeridos');
    }
};
$(fnReg.init);