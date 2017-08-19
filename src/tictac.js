$(document).ready(()=>{
    console.info('Loaded boardgame');
    
    /////////
    var activePlayer =  1,
        icons = ['.icon--x','.icon--y'],
        gameboard =  [],
        isPlayerAi = true

    //cast
    var boxes = $('.game-board li')
    var iconoplayer = $('.jugador--id .fa')
    ////////////
    $('.jugador--id h5 span').text(activePlayer)
    iconoplayer.addClass('fa-times')
    
    boxes
    .click((e)=>{
        console.log('PLAYER >> ', activePlayer)
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

        gameboard[$(el).index()] = activePlayer
        
        _checkWinner()
        changeIconoPlayer()
        
        if(isPlayerAi) setTimeout(()=>_playingAi(),3000)
    })
    
    function changeIconoPlayer() {
        activePlayer==1 ? activePlayer++ : activePlayer--
        $('.jugador--id h5 span').text(activePlayer)

        if(activePlayer==1)
            iconoplayer.removeClass('fa-circle-o').addClass('fa-times')
        else
            iconoplayer.removeClass('fa-times').addClass('fa-circle-o')
    }

    function _playingAi() {
        console.info('AI PLAYER >>','jugando...')
        let min = gameboard.length
        let emptyBlock = boxes[Math.floor(Math.random()*(9 - 1))]
        
        if(gameboard[$(emptyBlock).index()] == undefined){
            $(emptyBlock)
            .addClass('inactive')
            .find(icons[activePlayer-1])
            .addClass('active')
            
            gameboard[$(emptyBlock).index()] = activePlayer    
            changeIconoPlayer()

            console.info('AI PLAYER >> ', 'jugado')
            return;
        }

        _playingAi()
    }

    function _checkWinner() {
        console.info('WIN >> ', 'evaluando...')
        let win = 0
        if(gameboard.length > 3){
            //horizontal validation
            $.each(boxes, el => {
                if($(el).find('svg.active').css('display') != 'none'){

                }
            })
        }
    }

    function _endOfGame() {
        console.info('End of Game');
    }
})