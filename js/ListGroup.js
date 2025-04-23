function limpaFiltroPorAno() {
    window.location = "ListGroup.aspx?idCanal=" + getIdCanal();

}

function efetuarFiltroPorAno(ano) {

    var idCanal = $('input[id*=hdCanal]').val();
    var linguagem = $('input[class*=hidLinguagem]').val();
    $('div[id*=totalContent]').attr('style', 'display:none;');
    $('div[class*=loader]').attr('style', 'display:block;');

    $.ajax({
        type: "POST",
        url: "filtroListGroup.asmx/RefreshContent",
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

function getIdCanal() {
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}

function onError(result) {
    alert(result._message);
}

function onSuccess(result) {
    //alert(result);
    $('div#accordionList').empty();


    var i;
    var c;
    var text = "";
    var conteudos = "";
    for (i = 0; i < result.d.length; i++) {
        if (!(typeof result.d[i].Titulo === "undefined")) {
            var corpoHtmlBase = '<div class="item-accordion"> <div class="accordion accordion-flush" id="accordionFlushExample"> <div class="accordion-item"> <div class="accordion-header" id="flush-heading"> <div class="accordion-button collapsed divTitulo" type="button"  data-bs-toggle="collapse"  aria-expanded="false"  > <div class="names-accordion"><p> #TituloCanal </p> </div> </div><div id="flush-collapse" class="accordion-collapse collapse" > <div  class="accordion-body body-list"><div class="itens-list">#RecebeConteudos    </div> </div> </div> </div> </div> </div> </div>'
            corpoHtmlBase = corpoHtmlBase.replaceAll('#TituloCanal', result.d[i].Titulo);
            var corpoConteudos = "";

            for (c = 0; c < result.d[i].Materia.length; c++) {
                if (!(typeof result.d[i].Materia[c].Titulo === "undefined")) {
                    corpoConteudos = '<div class="list ajusteLista" data-aos="fade-up" data-aos-delay="200" ><a href="#trocaLink" id="recebeLink"><div class="texts-links"><span>#trocaData</span><p class="recebeTexto">#trocaTitulo</p></div><img src="images/icon-pdf.svg" alt="PDF" /> </a> </div>	';
                    corpoConteudos = corpoConteudos.replaceAll('#trocaData', result.d[i].Materia[c].Data);
                    corpoConteudos = corpoConteudos.replaceAll('#trocaTitulo', result.d[i].Materia[c].Titulo);
                    corpoConteudos = corpoConteudos.replaceAll('#trocaLink', result.d[i].Materia[c].Link);
                    conteudos += corpoConteudos;
                }
            }
            corpoHtmlBase = corpoHtmlBase.replaceAll('#RecebeConteudos', conteudos);
            conteudos = "";

           

        }
        text += corpoHtmlBase;
    }

    $('div#accordionList').append(text);


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

    $('h2').each(function () {
        if ($.trim($(this).html()) == "") {
            $(this).remove();
        }
    });

    $('ul').each(function () {
        if ($.trim($(this).html()) == "") {
            $(this).remove();
        }
    });

    var cont = 0;
    $('div[id*=accordionFlushExample]').each(function () {
        var id = $(this).attr('id');
        $(this).attr('id', id + cont);
        cont++;
    });

    var cont1 = 0;
    $('div[id*=flush-heading]').each(function () {
        var id = $(this).attr('id');
        $(this).attr('id', id + cont1);
        cont1++;
    });

    var cont2 = 0;
    $('div[class*=divTitulo]').each(function () {
        $(this).attr('data-bs-target', '#flush-collapse' + cont2);
        $(this).attr('aria-controls', 'flush-collapse' + cont2);
        cont2++;
    });

    var cont3 = 0;
    $('div[id*=flush-collapse]').each(function () {
        var id = $(this).attr('id');
        $(this).attr('id', id + cont3);
        $(this).attr('aria-labelledby', 'flush-heading' + cont3);
        $(this).attr('data-bs-parent', '#accordionFlushExample' + cont3);
        cont3++;
    });


    $('div[class*=names-accordion] p').each(function () {
        if ($.trim($(this).html()) == "") {
            $(this).parents('.item-accordion').remove();
        }
    });

    $('div[class*=loader]').attr('style', 'display:none;');
    $('div[id*=totalContent]').attr('style', 'display:block;');

}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}


$(document).ready(function () {

    sleep(1000);

    $('a[id*=linkListaTituloChamada]').each(function () {
        var link = $(this).attr('href');
        $(this).parents('.ajusteLista').find('a#recebeLink').attr('href', link);

        var textoLink = $(this).text();

        $(this).parents('.ajusteLista').find('.recebeTexto').text(textoLink);

        $(this).remove();
    });

    $('h2').each(function () {
        if ($.trim($(this).html()) == "") {
            $(this).remove();
        }
    });

    $('ul').each(function () {
        if ($.trim($(this).html()) == "") {
            $(this).remove();
        }
    });

    var cont = 0;
    $('div[id*=accordionFlushExample]').each(function () {
        var id = $(this).attr('id');
        $(this).attr('id', id + cont);
        cont++;
    });

    var cont1 = 0;
    $('div[id*=flush-heading]').each(function () {
        var id = $(this).attr('id');
        $(this).attr('id', id + cont1);
        cont1++;
    });

    var cont2 = 0;
    $('div[class*=divTitulo]').each(function () {
        $(this).attr('data-bs-target', '#flush-collapse' + cont2);
        $(this).attr('aria-controls', 'flush-collapse' + cont2);
        cont2++;
    });

    var cont3 = 0;
    $('div[id*=flush-collapse]').each(function () {
        var id = $(this).attr('id');
        $(this).attr('id', id + cont3);
        $(this).attr('aria-labelledby', 'flush-heading' + cont3);
        $(this).attr('data-bs-parent', '#accordionFlushExample' + cont3);
        cont3++;
    });


    $('div[class*=names-accordion] p').each(function () {
        if ($.trim($(this).html()) == "") {
            $(this).parents('.item-accordion').remove();
        }
    });

    $('div[class*=loader]').attr('style', 'display:none;');
    $('div[id*=totalContent]').attr('style', 'display:block;');
    
});