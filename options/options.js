// Saves options to chrome.storage
$('#webhook_filter').hide();
$('#namefilter_form').hide();


$('save').click(save_options);

function save_options(evt) {
    const $status = document.getElementById('status');
    $status.style.display = 'block';
    $status.textContent = 'Options saved.';

    setTimeout(function() {
        $status.textContent = '';
        $status.style.display = 'none';
    }, 1500);
}

$('#discord_active').click( function(evt){
    if(evt.target.checked){
        $('#webhook_filter').show();
    }else{
        $('#webhook_filter').hide();
    }
});

$('#namefilter_active').click( function(evt){
    if(evt.target.checked){
        $('#namefilter_form').show();
    }else{
        $('#namefilter_form').hide();
    }
});