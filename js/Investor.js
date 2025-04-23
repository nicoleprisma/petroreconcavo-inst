$(document).ready(function () {

    sleep(1000);
    $('div[class*=loader]').attr('style', 'display:none;');
    $('div.lista').attr('style', 'display:block;');

    $("a[id*=linkListaTituloChamada]").each(function () {
        var link = $(this).attr('href');
        $(this).parents('.ajusteLista').find('a.recebeLink').attr('href', link);

        var textoLink = $(this).text();

        $(this).parents('.ajusteLista').find('.recebeTexto').text(textoLink);

        $(this).remove();

    });

    $('.anoList').text($("select[id*=ddlAnoFiltro] option:selected").text());

    
});


function efetuarFiltroPorAno(ano) {

    var idCanal = $('input[id*=hdCanal]').val();
    var linguagem = $('input[class*=hidLinguagem]').val();

    $('div.lista').attr('style', 'display:none;');
    //$('.loaderMaster').attr('style', 'display:none;');
    $('div[class*=loader]').attr('style', 'display:flex;');

    $.ajax({
        type: "POST",
        url: "filtroList.asmx/Filtro",
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
}

function limpaFiltroPorAno() {
    window.location = "List.aspx?idCanal=" + getIdCanal();
}

function onSuccess(result) {
    //alert(result);
    $('div.lista').empty();
    var i;
    var text = "";
    for (i = 0; i < result.d.length; i++) {
        if (!(typeof result.d[i].Titulo === "undefined")) {

            var corpoHtml = '<span class="ajusteLista"> <a href="#trocaLink" class="recebeLink"> <span class="recebeTexto"> #trocaTitulo</span> <img src="images/icon-external.svg" alt="Link"> </span> ';


            corpoHtml = corpoHtml.replaceAll('#trocaData', result.d[i].Data);
            corpoHtml = corpoHtml.replaceAll('#trocaTitulo', result.d[i].Titulo);
            corpoHtml = corpoHtml.replaceAll('#trocaLink', result.d[i].Link);


            text += corpoHtml;
        }

    }

    $('div.lista').append(text);


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

                if ((url.toLowerCase().indexOf('/resultados') > -1) || (url.toLowerCase().indexOf('/results') > -1)) {
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

    $('div[class*=loader]').attr('style', 'display:none;');
    $('div.lista').attr('style', 'display:block;');



}

function onError(result) {
    alert(result._message);
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function getIdCanal() {
    var strReturn = "";
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}




