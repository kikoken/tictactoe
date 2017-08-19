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
    
    boxes.on('click',handleClick)
    
    function handleClick(e){
        console.log('PLAYER >> ', activePlayer)
        let el = e.currentTarget
        let isGamingOption = gameboard.length < 9 
                            && gameboard[$(el).index()] == undefined 
        
        if(!isGamingOption){
            _endOfGame()
            return
        }

        $(el)
            .addClass('inactive')
            .find(icons[activePlayer-1])
            .addClass('active')

        gameboard[$(el).index()] = activePlayer
        
        if(_checkWinner()) return

        changeIconoPlayer()
        
        if(isPlayerAi) setTimeout(()=>_playingAi(),3000)
    }
    
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
        let winPlayer = 0
        if(gameboard.length > 3){
            console.info('============')
            console.info('WIN >> ', 'evaluando...')
            
            winPlayer = _horizontalEvaluation()
            if(winPlayer>0)
                return _endOfGame(winPlayer)
            
            winPlayer = _verticalEvaluation()
            if(winPlayer>0)
                return _endOfGame(winPlayer)
            
            winPlayer = _diagonalValidation()
            if(winPlayer>0)
                return _endOfGame(winPlayer)
            console.info('============')
        }

        return false
    }

    function _diagonalValidation() {
        let result = 0
        let diagonal_1 = gameboard[0] == gameboard[4] == gameboard[8]
        if(diagonal_1){
            result = gameboard[0]
            return result
        }
        
        let diagonal_2 = gameboard[2] == gameboard[4] == gameboard[6]
        if(diagonal_2){
            result = gameboard[0]
            return result
        }
        
        return result
    }

    function _verticalEvaluation() {
        let result = 0
        for(let i = 0; i < 3; i ++){
            let equal = gameboard[i] == gameboard[i+3] == gameboard[i+6]
            if(equal){
                result = gameboard[i]
                break
            }
        }

        return result
    }

    function _horizontalEvaluation() {
        console.info('Check horizontal ...')
        let result = 0
        let max = $(boxes).length - 1
        for(let i = 0; i < max; i ++ ){            
            if((i+1)%3==0){
                let equal = gameboard[i] == gameboard[i-1] == gameboard[i-2]
                if(equal){
                    result = gameboard[i]
                    break
                }
            }
        }

        return result;
    }

    function _endOfGame(winner = 0) {
        boxes.off('click', handleClick)
        console.info('>>>>>>>>>>>>>>>');
        console.info('End of Game');
        if(winner>0)
            console.log('WINNER >> PLAYER ', winner)
        console.info('>>>>>>>>>>>>>>>');

        return true
    }
})