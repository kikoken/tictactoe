$(document).ready(()=>{
    console.info('Loaded boardgame');
    
    /////////
    var activePlayer =  1,
        icons = ['.icon--x','.icon--y'],
        gameboard =  []

    //cast
    var boxes = $('.game-board li')

    boxes
        .click((e)=>{
            console.log('Player:', activePlayer)
            let el = e.currentTarget
            let isGamingOption = gameboard.length<9 
            && gameboard[$(el).index()] == undefined 
            
            if(isGamingOption){
                $(el)
                .addClass('inactive')
                .find(icons[activePlayer-1])
                .addClass('active')
            }
            
            activePlayer==1 ? activePlayer++ : activePlayer--
        })
})