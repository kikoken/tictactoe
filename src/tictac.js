$(document).ready(()=>{
    console.info('Loaded boardgame');
    
    /////////
    var activePlayer =  1,
        icons = ['.icon--x','.icon--y'],
        gameboard =  []

    //cast
    var boxes = $('.game-board li')

    ////////////
    $('.jugador--id h5 span').text(activePlayer)
    
    boxes
    .click((e)=>{
        console.log('Player:', activePlayer)
        let el = e.currentTarget
        let isGamingOption = gameboard.length < 9 
                            && gameboard[$(el).index()] == undefined 
        
        if(!isGamingOption){
            _endOfGame()
            return;
        }

        $(el)
            .addClass('inactive')
            .find(icons[activePlayer-1])
            .addClass('active')
        
        activePlayer==1 ? activePlayer++ : activePlayer--
        $('.jugador--id h5 span').text(activePlayer)

        _checkWinner()
    })

    function _checkWinner() {
        
    }
})