function efetuarFiltroPorAno(ano) {

    var idCanal = $('input[id*=hdCanal]').val();
    var linguagem = $('input[class*=hidLinguagem]').val();

    $('div[id*=totalContent]').attr('style', 'display:none;');
    //$('.loaderMaster').attr('style', 'display:none;');
    $('div[class*=loader]').attr('style', 'display:flex;');

    $.ajax({
        type: "POST",
        url: "filtroPost.asmx/Filtro",
        data: JSON.stringify({
            "ano": ano,
            "idCanal": idCanal,
            "linguagem": linguagem
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: onSuccess,
        error: function (result) {
        }

    });


    //PageMethods.RefreshContent(ano, idCanal, linguagem, onSuccess, onError);

}

function efetuarFiltroCategoriaAno() {


    var categoria = $('select[id*=ddlCategoriaFiltro] option:selected').val().trim();
    var ano = $('select[id*=ddlAnoFiltro] option:selected').val();

    var idCanal = $('input[id*=hdCanal]').val();
    var linguagem = $('input[class*=hidLinguagem]').val();
    $('div[id*=totalContent]').attr('style', 'display:none;');
    $('div[class*=loader]').attr('style', 'display:flex;');

    $.ajax({
        type: "POST",
        url: "filtroPost.asmx/FiltroCategoria",
        data: JSON.stringify({
            "categoria": categoria,
            "ano": ano,
            "idCanal": idCanal,
            "linguagem": linguagem
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: onSuccess,
        error: function (result) {
        }
    });


    //PageMethods.RefreshCategoriaAno(ano, categoria, idCanal, linguagem, onSuccess, onError);
}





$(document).ready(function () {
    sleep(1000);
    $('div[class*=loader]').attr('style', 'display:none;');
    $('div[id*=totalContent]').attr('style', 'display:grid;');

    $("a[id*=linkListaTituloChamada]").each(function () {
        var link = $(this).attr('href');
        $(this).parents('.ajusteLista').find('a.recebeLink').attr('href', link);

        var textoLink = $(this).text();

        $(this).parents('.ajusteLista').find('.recebeTexto').text(textoLink);

        if (link.indexOf("show") == -1) {
            $(this).parents('.ajusteLista').find('a.recebeLink').attr('target', '_blank');
        }

        $(this).remove();

    });

    var tipos = new Array();
    var selectTipos = document.getElementById("ddlCategoriaFiltro");

    $('.subTituloTipo').each(function () {
        var tipo = $.trim($(this).text());

        if ($.inArray(tipo, tipos) == -1) {
            tipos.push(tipo);
            return;
        }
    });

    for (var i = 0; i < tipos.length; i++) {
        var opt = tipos[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;

        selectTipos.appendChild(el);

    }

});


function onSuccess(result) {
    //alert(result);
    $('div.cards-common-reag').empty();
    var i;
    var text = "";
    for (i = 0; i < result.d.length; i++) {
        if (!(typeof result.d[i].Titulo === "undefined")) {
            if ($(".hidLinguagem").val() == "ptg") {

                var corpoHtml = '<div class="cards ajusteLista" data-aos="fade-up" data-aos-delay="200">  <div class="imagem-card"> <img src="#trocaImagem" alt="Imagem Reag" id="imgMateria"  /> </div> <div class="content-card"> <div class="disc"> <span> #trocaSubtitulo </span> </div> <div class="main-informations"> <h3 class="recebeTexto"> #trocaTitulo </h3> </div> <div class="final-link"> <a href="#trocaLink" class="recebeLink"> Leia mais </a> </div> </div> </div>';

                corpoHtml = corpoHtml.replaceAll('#trocaData', result.d[i].Data);
                corpoHtml = corpoHtml.replaceAll('#trocaTitulo', result.d[i].Titulo);
                corpoHtml = corpoHtml.replaceAll('#trocaLink', result.d[i].Link);
                corpoHtml = corpoHtml.replaceAll('#trocaImagem', result.d[i].Imagem);
                corpoHtml = corpoHtml.replaceAll('#trocaSubtitulo', result.d[i].TituloChamada);


                text += corpoHtml;
            } else {
                var corpoHtml = '<div class="cards ajusteLista" data-aos="fade-up" data-aos-delay="200">  <div class="imagem-card"> <img src="#trocaImagem" alt="Imagem Reag" id="imgMateria"  /> </div> <div class="content-card"> <div class="disc"> <span> #trocaSubtitulo </span> </div> <div class="main-informations"> <h3 class="recebeTexto"> #trocaTitulo </h3> </div> <div class="final-link"> <a href="#trocaLink" class="recebeLink"> Read more </a> </div> </div> </div>';

                corpoHtml = corpoHtml.replaceAll('#trocaData', result.d[i].Data);
                corpoHtml = corpoHtml.replaceAll('#trocaTitulo', result.d[i].Titulo);
                corpoHtml = corpoHtml.replaceAll('#trocaLink', result.d[i].Link);
                corpoHtml = corpoHtml.replaceAll('#trocaImagem', result.d[i].Imagem);
                corpoHtml = corpoHtml.replaceAll('#trocaSubtitulo', result.d[i].TituloChamada);


                text += corpoHtml;
            }
        }

    }

    $('div.cards-common-reag').append(text);


    $('a').each(function () {
        var link = $(this);
        var urlLink = $(this).attr('href');
        if (typeof link.attr('href') != 'undefined') {
            if ((link.attr('href').indexOf('/Download/') > -1) || (link.attr('href').indexOf('download.aspx') > -1) || (link.attr('href').indexOf('Download.aspx') > -1)) {
                var descricao = link.text().trim();
                link.attr('target', '_blank');

                if (descricao == '') {
                    descricao = urlLink.split('download.aspx?')[1];
                }

                var url = window.location.href;

                if ((url.toLowerCase().indexOf('/central') > -1) || (url.toLowerCase().indexOf('/center') > -1)) {
                    var ano = $(this).parents('div[id*=divResultados]').attr('ano');
                    if (ano != undefined) {
                        var idLink = $(this).attr('id');
                        descricao = idLink.split('_')[4];

                        if ($(".hidLinguagem").val() == "ptg") {
                            link.attr("onClick", "gtag('event', 'file_download', {'link_text' : '" + descricao + "_PT_" + ano + "','file_name' : '" + descricao + "_PT_" + ano + "'});");

                        } else {
                            link.attr("onClick", "gtag('event', 'file_download', {'link_text': '" + descricao + "_EN_" + ano + "','file_name' : '" + descricao + "_EN_" + ano + "'});");
                        }
                    }


                } else {
                    link.attr("onClick", "gtag('event', 'file_download', {'link_text' : '" + descricao + "','file_name' : '" + descricao + "'});");
                }
            }
        }
    });

    if ($('.cards-common-reag').text().trim() === '') {
        if ($(".hidLinguagem").val() == "ptg") {
            $('.cards-common-reag').first().html('<div><p>Não existem matérias com esse filtro escolhido.</p></div> ');
        } else {
            $('.cards-common-reag').first().html('<div><p>There are no articles with this filter chosen.</p></div> ');
        }
    }

    $('div[class*=loader]').attr('style', 'display:none;');
    $('div[id*=totalContent]').attr('style', 'display:grid;');



}


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}






function onError(result) {
    alert(result._message);
}

function getIdCanal() {
    var strReturn = "";
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}




