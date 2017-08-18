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
        
        _checkWinner()
        
        activePlayer==1 ? activePlayer++ : activePlayer--
        $('.jugador--id h5 span').text(activePlayer)

    })

    function _checkWinner() {
        console.info('check win...')
        let win = 0
        if(gameboard.length > 3){
            //horizontal validation
            $.each(boxes, el => {
                if($(el).find('svg.active').hascss('display') != 'none'){

                }
            })
        }
    }

    function _endOfGame() {
        console.info('End of Game');
    }
})