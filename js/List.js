$(document).ready(function () {   

    $("a[id*=linkListaTituloChamada]").each(function () {
        var link = $(this).attr('href');
        $(this).parents('.ajusteLista').find('a.recebeLink').attr('href', link);

        var textoLink = $(this).text();

        $(this).parents('.ajusteLista').find('.recebeTexto').text(textoLink);

        $(this).remove();

    });

    $('a.disabled').remove();
    $('a#lnkAnterior').remove();
    $('a#lnkProximo').remove();

    var tituloCanal = $('.title-list h2').text().trim();

    $('select[id*=selectFundos] option').each(function () {
        var texto = $(this).text().trim();

        if (tituloCanal == texto) {
            $(this).attr('selected', true);
        }
    });


    
    function organizeOptions() {
        const select = $('#selectFundos');
        const options = select.find('option');

        
        const groupedOptions = {};

        
        options.sort((a, b) => a.text.localeCompare(b.text)).each(function () {
            const option = $(this);
            const firstLetter = option.text().charAt(0).toUpperCase();

            if (!groupedOptions[firstLetter]) {
                groupedOptions[firstLetter] = [];
            }

            groupedOptions[firstLetter].push(option);
        });

        select.empty();
        $.each(groupedOptions, function (letter, options) {
            const optgroup = $('<optgroup>').attr('label', letter);
            options.forEach(option => optgroup.append(option));
            select.append(optgroup);
        });
    }

    organizeOptions();

    $('#selectFundos').select2({
        placeholder: "Digite o nome do fundo...",  
        allowClear: true,
        language: {
            inputTooShort: function () {
                return "Digite o nome do fundo...";  
            }
        },
        minimumResultsForSearch: 0  
    });

    $('.select2-selection__clear').remove();

    $('#selectFundos').on('select2:open', function () {
        $('.select2-search__field').attr('placeholder', 'Digite o nome do fundo...');
    });

   
});





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




