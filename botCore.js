const selX = {
    skinItem: '/html/body/main/section[2]/div[2]/div/div[3]/div[1]',
    containerSkins:'/html/body/main/section[2]/div[2]/div/div[3]',
    btnForBuy: '/html/body/main/section[2]/div[2]/section/header/button',
    containerSkinsClickes: '/html/body/main/section[2]/div[2]/section/section',
    withdrawalsLen:'/html/body/main/section[2]/div[2]/section/header',
    loadMoreBtn:'/html/body/main/section[2]/div[2]/div/button',
    willSpend: '/html/body/main/section[2]/div[2]/section/header/div/span'
};
const sel = {

};

var botIntervalTime = false;
var hasItemInCart = false;
var willSpend = 0;

var config = {
    limitAttemptPurchase: 5,
    moneyLimit: 2000,
    minPrice: 1,
    maxPrice: 2000,
}

function core(){
    console.clear();
    insertBotPanel()
} 






function insertBotPanel(){
    const $mother = $('section.body');

    $mother.prepend(`
        <style>
            #botContainer{
                background-color: #1A1D29;
                display:block;
                padding:20px;
                margin:10px;
                
            }

            .btn-bot {
                background-color: #12131B;
                border: 1px solid transparent;
                padding: 4px 50px;
                box-shadow: 0 10px 46px rgba(0,0,0,0.6);
                border-radius: 2em;
                cursor: pointer;
                color: #ffb019;
                font-family: 'Titillium Web', sans-serif;
                font-size: 22px;
                line-height: 44px;
                font-weight: 400;
                text-transform: capitalize;
                transition: .2s ease-in-out;
                outline: none;
            }

            .btn-bot:hover {
                box-shadow: 0 10px 46px rgba(0,0,0,1);
            }
            .btn-bot:active {
                background-color: #bdc3c7;
            }
            
        </style>
    `);
    
    $mother.prepend('<div id="botContainer"></div>');
    const $botContainer = $('#botContainer');
    $botContainer.prepend('<button class="btn-bot" id="start_btn">Iniciar Bot</button>');
    $botContainer.prepend('<button class="btn-bot" id="stop_btn">Parar Bot</button>');


    onclickWhenLoad( '#start_btn', (evt) => {
        console.log('INICIANDO BOT...')
        $( evt.target ).animate({
            backgroundColor:'blue',
            zIndex:9999
        }, 100);
        startBot();
    });

    onclickWhenLoad( '#stop_btn', (evt) => {
        console.log('PARANDO BOT...');
        stopBot();
    });

}


function stopBot(){
    if(botIntervalTime){
        clearInterval(botIntervalTime);
        console.log('Bot Parado');
        $('#start_btn').text('Iniciar Bot');
    }
}

function startBot(){
    if( botIntervalTime )stopBot();
    $('#start_btn').text('Bot Rodando...');
    botRunner();
    botIntervalTime = setInterval( botRunner, 1500 );
}

function botRunner(){ 
    addSkinsInCart();
    buyAfterAddSkins();
}

function clickLoadMoreBtn( skinsLen ){
    $(_x(selX.loadMoreBtn)).click();
    let currentSkinsLen =  $(_x(selX.containerSkins)).children().length;
    if( skinsLen < currentSkinsLen ){
        console.log('LOAD MORE SKINS...');
        clickLoadMoreBtn(currentSkinsLen);
    }

}

function addSkinsInCart(){
    const $willSpendValue = parseFloat( $(_x(selX.willSpend)).text() ) || 0;
    if($willSpendValue !== willSpend) willSpend = $willSpendValue;
    console.log(`%c seu spend total => ${willSpend}`, 'color:red;')
    $(_x(selX.containerSkins)).children().each(
        function () {
            const skiName = parseSkinName( $(this).find('.font-bold.text-xs.text-gray-200.mb-10.leading-none').text() );
            const skinValue = parseFloat(this.querySelector('.icon.fill-current.inline-block.mr-10.text-yellow').nextSibling.textContent);
        
            console.log(`Analisando skin: ${skiName}`);

            if( skinValue >= config.minPrice && skinValue <= config.maxPrice && (skinValue + willSpend) < config.moneyLimit){

                
                $(this).click();
                willSpend += skinValue;
                hasItemInCart = true;

                console.log(`%c Comprado : ${skiName} de valor ${skinValue}`, 'color:#2ecc71;background-color:#ecf0f1;');

            }else{
                console.log('Preço acima do permitido de Skin, Spend total atingindo ou Quantidade máxima de produtos no carrinho.');
            }
        }
    )
}


function buyAfterAddSkins( attempt = 1 ){
    if(attempt == 1)console.log( $( _x(selX.withdrawalsLen)).text() );
    if(attempt == config.limitAttemptPurchase )return console.log('Número máximo de tentativas atingidas, continuando bot...');
    if( hasItemInCart ){
        console.log('Tentativa de compra número', attempt);
        try {
            clickBtnBuy();
            console.log('%c Comprado com sucesso', 'background-color:#27ae60;color:#fff;');
            hasItemInCart = false;
        } catch (error) {
            console.log('%c Falha ao comprar, tentando novamente...', 'background-color:#e74c3c;color:#fff;');
            setTimeout(`buyAfterAddSkins(${attempt += 1})`, 200 );
        }
    }else{
        console.log('Sem novas skins no carrinho')
    }
}

function clickBtnBuy(){
    _x( selX.btnForBuy ).click();
}


function parseSkinName(str){
    return str.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '').toLowerCase().trim();
}

function onclickWhenLoad( sel, func ){
    try {
        document.querySelector(sel).onclick = func;
    } catch (error) {
        console.log('bot falhou ao injetar onclick');
        setTimeout(onclickWhenLoad, 100);
    }
}
function _x(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}






window.onload = core
