// Select The Start Game Button
document.querySelector('.control-buttons span').onclick = function(){

    // Prompt Window To Ask For Name
    let yourName = prompt("Whats Your Name?");
    
    // IF Name is Empty
    if(yourName == null || yourName == ""){
        /// Set Name To Unknown
        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        // Else Set Name TO YourName
        document.querySelector('.name span').innerHTML = yourName;
    }
    // Remove Splash Screen
    document.querySelector('.control-buttons').remove();
};
// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector('.memory-game-block');

// Create Range of keys 
let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

// Add order CSS Property to Game Blocks
blocks.forEach((block ,index) => {

    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function(){
        // Triggle the Flip Block Function
        flipBlock(block);
    })

});

// Flip Block Function
function flipBlock(selectedBlock) {
    // Add Class is Flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flip Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // IF There is Two Slected Blocks
    if(allFlippedBlocks.length === 2){

        // Stop Clicking Function
        stopClicking();
        // check Match Block Function
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
    
}

// Stop Clicking Function
function stopClicking(){
    // Add Class no-clicking on Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        // Remove Class no-clicing After the Duration
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// Check Matched Block
function checkMatchedBlock(firstBlock, secondBlock){
    let tries = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() =>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}

// Shuffle function
function shuffle(array){
    // Setting Vars
    let current = array.length,
    temp,
    random;

    while(current > 0){

        // get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By one
        current--;

        // Save Current Element in Stash
        temp = array[current];

        // Current Element = Random Element
        array[current] = array[random];

        // Random Element = Get Element from Stash
        array[random] = temp;

    }
    return array;
}