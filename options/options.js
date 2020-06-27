// Saves options to chrome.storage
$('#webhook_filter').hide();

/*
$('#namefilter_form').hide();
$('#blackListNameFilter_form').hide();
*/

$('#save').click(save_options);

function save_options(evt) {
    evt.preventDefault();
    
    const minPrice = $('#min-value').val();
    const maxPrice = $('#max-value').val();

    const webhook = $('#discord_active').prop('checked')?$('#webhook').val():'';

    /*
    const skinNamesFilter = $('#namefilter_active').prop('checked')?$('#nameFilterInput').val().split(','):false;
    const blackListSkins = $('#blacknamefilter_active').prop('checked')?$('blackListFilterInput').val().split(','):false;
    */

    const maxSpend = $('#max-spend').val();

    chrome.storage.sync.set({
        minPrice: minPrice,
        maxPrice: maxPrice,
        webhook: webhook,
        //skinNamesFilter:skinNamesFilter,
        maxSpend:maxSpend,
        //blackListSkins:blackListSkins
      }, function() {
            // Update status to let user know options were saved.
            const $status = document.getElementById('status');
            $status.style.display = 'block';
            $status.textContent = 'Salvo com sucesso.';
            setTimeout(function() {
                $status.textContent = '';
                $status.style.display = 'none';
            }, 1500);
      });

    
}

$('#discord_active').click( function(evt){
    if(evt.target.checked){
        $('#webhook_filter').show();
    }else{
        $('#webhook_filter').hide();
    }
});

/*
$('#namefilter_active').click( function(evt){
    if(evt.target.checked){
        $('#namefilter_form').show();
    }else{
        $('#namefilter_form').hide();
    }
});

$('#blacknamefilter_active').click( function(evt){
    if(evt.target.checked){
        $('#blackListNameFilter_form').show();
    }else{
        $('#blackListNameFilter_form').hide();
    }
});
*/

window.onload = () => {
    chrome.storage.sync.get({
        minPrice: 1,
        maxPrice: 10,
        webhook: '',
        /*skinNamesFilter:false,
        blackListSkins:false,*/
        maxSpend:10
    }, function(items) {
        $('#min-value').val( items.minPrice );
        $('#max-value').val( items.maxPrice );
        $('#max-spend').val( items.maxSpend );

        if(items.webhook){
            $('#discord_active').click();
            $('#webhook').val(items.webhook);
        }
        /*
        if(items.skinNamesFilter){
            $('#namefilter_active').click();
            $('#nameFilterInput').val(items.skinNamesFilter);
        }
        if(items.blackListSkins){
            $('#blacknamefilter_active').click();
            $('blackListFilterInput').val(items.blackListSkins);
        }
        */
    });   
}