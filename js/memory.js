$(document).ready(function () {

  // select button start game
  $(".control-buttons span").click(function () {
    // prompt windows enter user name
    let UserName = prompt("Please Enter User Name");
    //   check is username empty
    if (UserName == null || UserName == " " || UserName == "") {
      // set name to player
      $(".info .name").append(" " + "player").css("color", "blue");
    }
    //is username not empty
    else {
      // set name to your name
      $(".info .name").append(" " + UserName).css("color", "blue");
    }
    //   remove splash screen
    $(".control-buttons").remove();

    // sound background
    document.querySelector("#background").play();
  })


  // for time rotate
  let duration = 1000;
  // select main div
  let blocksContainer = document.querySelector(".memorey-game-block");
  // creat array
  let blocks = Array.from(blocksContainer.children);
  // get index array
  // let orderRange = [...Array(blocks.length).keys()];
  let orderRange = Array.from(Array(blocks.length).keys());
  // console.log(orderRange);
  shuffel(orderRange);
  // console.log(orderRange);

  // forEach
  blocks.forEach((block, index) => {
      // add order property css
    block.style.order = orderRange[index];
    // flipblock
    $(block).click(function () {
      flipBlock(block);
    })

  })

  // flip block function
  function flipBlock(selectedBlock) {
    // add classis-flipe
    selectedBlock.classList.add("is-flipe");

    // collected all flipped cards
    let allFlippedBlocks = blocks.filter(allFlippedBlock => allFlippedBlock.classList.contains("is-flipe"));
    // if theres two selected blocks
    if (allFlippedBlocks.length === 2) {
      // function stopclicking
      stopclicking();
      // function matching
      matchingBlockes(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
   
  }

  function matchingBlockes(firstBlock, secondBlock) {
    let wrongElement = document.querySelector(".wrong span")
    // checked blocks matching
    if (firstBlock.dataset.fruit === secondBlock.dataset.fruit) {

      // remove class is-flipe
      firstBlock.classList.remove("is-flipe");
      secondBlock.classList.remove("is-flipe");

      // add class is-flipe
      firstBlock.classList.add("has-match");
      secondBlock.classList.add("has-match");

      // sound success
      document.querySelector("#success").play();

    } else {
      // wrong plus
      wrongElement.innerHTML = parseInt(wrongElement.innerHTML) + 1;

      // style wrong
      wrongElement.parentElement.style.color = "red";

      //is not matching remove class is-flipe
      setTimeout(() => {
        // remove is-flipe
        firstBlock.classList.remove("is-flipe");
        secondBlock.classList.remove("is-flipe");

      }, duration)

      // error sound
      document.querySelector("#error").play();
    }
  }

  function stopclicking() {
    // add class no-clicking
    blocksContainer.classList.add("no-clicking");

    // remove class no-clicking befor 1s
    setTimeout(() => {
      blocksContainer.classList.remove("no-clicking");
    }, duration);
  }

  function shuffel(array) {
    // setting varibel
    let current = array.length,
      temp,
      random;

    while (current > 0) {
      // rendom number
      random = Math.floor(Math.random() * current);
      // decrease length by one
      current--;
      // save current element by stash
      temp = array[current];
      // currwnt element = random
      array[current] = array[random];
      //random element = get element from stash
      array[random] = temp;

    }
    return array;


  }
})