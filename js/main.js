$(document).ready(function () {
  let cellQty = (4 * 4);
  let board, getBoard, storageBoard;
  let step, getStep, storageStep;
  let valOne, valTwo, getVal, storageValOne;

  // fill cells
  function randomFill(cellQty, board) {
    for (let i = 1; i < cellQty; i++) {

      do {
        var temp = Math.floor(Math.random() * cellQty / 2);
        var x = 0;

        for (let j = 0; j <= board.length; j++) {
          if (board[j] !== undefined && board[j][0] === temp) {
            x++;
          }
        }
      }
      while (x > 1);
      board.push([temp, 'empty']);
    }

    setStorage();
    return board;
  }

  // load cells
  function loadCells() {
    for (let i = 0; i < cellQty; i++) {
      $(".board").append("<div class='board__item'><div class='inner'></div></div>");
      $(".board__item:last-child").attr("data-value", board[i][0]).attr("data-index", i);
    }
  }

  // check cells
  function checkCells() {
    $(".board__item").on('click', function (event) {
      let tempVal = $(this).data('value');
      let indx = $(this).data('index');

      event.preventDefault();
      $(this).addClass('temp');
      board[indx][1] = 'temp';

      if(!valOne) {
        getValOne();
      }

      if (!step) {
        valOne = tempVal;
        setValOne();
        step++;
      } else {
        valTwo = tempVal;
        step--;
      }

      if (!step) {
        if (valOne === valTwo) {
          setTimeout(function () {
            $(".board__item.temp").addClass("checked").removeClass("temp");
            let checked = 0;
            for(let i = 0; i < board.length; i++) {
              if(board[i][1] === 'temp') {
                board[i][1] = 'checked'
              }
              if(board[i][1] === 'checked') {
                checked++;
                if(checked === 16) {
                  $(".finish").fadeIn();
                }
              }
            }
            setStorage();
          }, 200);
        }
        else if (valOne !== valTwo) {
          setTimeout(function () {
            $(".board__item.temp").removeClass("temp");
            for(let i = 0; i < board.length; i++) {
              if(board[i][1] === 'temp') {
                board[i][1] = 'empty'
              }
            }
            setStorage();
          }, 200);
        }
      }
      setStorage();
      setStep();
    });
  }

  // check cells from storage
  function checkCellsStorage() {
    for(let i = 0; i < board.length; i++) {
      if(board[i][1] === 'temp') {
        console.log(4545454555454);
        $(`[data-index='${i}'`).addClass('temp');
      }

      if(board[i][1] === 'checked') {
        $(`[data-index='${i}'`).addClass('checked');;
      }
    }
  }

  // set step
  function setStep() {
    storageStep = JSON.stringify(step);
    localStorage.setItem("step", storageStep);
  }
  // get step
  function getSteps() {
    getStep = localStorage.getItem("step");
    step = JSON.parse(getStep);
  }

  // set value one
  function setValOne() {
    storageValOne = JSON.stringify(valOne);
    localStorage.setItem("val-one", storageValOne);
  }
  // get value one
  function getValOne() {
    getVal = localStorage.getItem("val-one");
    valOne = JSON.parse(getVal);
  }

  // set storage
  function setStorage() {
    storageBoard = JSON.stringify(board);
    localStorage.setItem("board", storageBoard);
  }

  // clear storage
  function clearStorage() {
    $("#clearBoard").on('click', function (event) {
      localStorage.clear();
      location.reload();
    });
  }

  getSteps();
  if(!step) {
    step = 0;
  }

  getBoard = localStorage.getItem('board');
  board = JSON.parse(getBoard);
  if(!board) {
    board = [[Math.floor(Math.random() * cellQty / 2), 'empty']];
    randomFill(cellQty, board);
  }

  loadCells();
  checkCells();
  checkCellsStorage();
  clearStorage();
});


