var fnReg ={
    init: function(){
        if(!fnReg.estaRegistrado())
            window.location.href="#registro";
        $('#registro div[data-role=footer] a').click(fnReg.registrar);
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
            alert(nom + ' ' + mail + ' ' + tel);
        else
            alert('Todos los datos son requeridos');
    }
};

$(fnReg.init);