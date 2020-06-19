const selX = {
    skinItem: '/html/body/main/section[2]/div[2]/div/div[3]/div[1]',
    containerSkins:'/html/body/main/section[2]/div[2]/div/div[3]',
    btnForBuy: '/html/body/main/section[2]/div[2]/section/header/button',
    containerSkinsClickes: '/html/body/main/section[2]/div[2]/section/section',
    withdrawalsLen:'/html/body/main/section[2]/div[2]/section/header'

};
const sel = {

};

var botIntervalTime = false;
var hasItemInCart = false;

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
        console.log('PARANDO BOT...')
        stopBot();
    });

}




function stopBot(){
    if(botIntervalTime)clearInterval(botIntervalTime)
}


function startBot(){
    botRunner();
    botIntervalTime = setInterval( botRunner, 2000 );
}

function botRunner(){
    addSkinsInCart();
    clickToBuy(0);
}

function addSkinsInCart(){
    $(_x(selX.containerSkins)).children().each(
        function () {
            const skiName =  $(this).find('div.p-15.font-medium.text-base.leading-tight.text-gray-100').text();
            let skinValue = parseFloat(this.querySelector('.icon.fill-current.inline-block.mr-10.text-yellow').nextSibling.textContent);
            console.log(`Analisando skin: ${skiName}`)
            if( skinValue >= 1 && skinValue <= 10){
                $(this).click()
                console.log(`Comprado : ${skiName} de valor ${skinValue}`)
                hasItemInCart = true
            }    

        }
    )
}

function clickToBuy( count ){
    console.log('CHILDREN ABAIXO');
    console.log( $( _x(selX.withdrawalsLen)).text() );

    if(count === 10){
        return false;
    }
    
    if( $( _x(selX.withdrawalsLen)).text() !== 'Withdrawals (0)' ){
        function tryClick(){
            try {
                _x( selX.btnForBuy ).click();
                console.log('Comprado com sucesso');
            } catch (error) {
                console.log('Falha ao comprar, verifique seu saldo, ou tente novamente.');
            }
        }
        
        return setTimeout( tryClick, 2000 );
    }

    setTimeout( ()=> clickToBuy(count += 1), 1000 );
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
