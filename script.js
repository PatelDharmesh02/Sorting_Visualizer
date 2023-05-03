const n = 20;
const array = [];

intial();

function intial() {
    for(let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

function playBubbleSort() {
    const copyArr = [...array];
    const moves = bubbleSort(copyArr);
    animateBars(moves);
}

function playSelectionSort() {
    const copyArr = [...array];
    const moves = selectionSort(copyArr);
    animateBars(moves);
}

function playInsertionSort() {
    const copyArr = [...array];
    const moves = insertionSort(copyArr);
    animateBars(moves);
}


function animateBars(moves) {
    if(moves.length == 0) {
        showBars();
        return;
    }

    const move = moves.shift();
    const [i,j] = move.indices;
    if(move.type == "swap") {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    showBars(move);
    setTimeout(function() {
        animateBars(moves);
    },0);
}

function bubbleSort(array) {
    const moves = [];
    do {
        var swapped = false;
        for(let i = 1; i < array.length; i++) {
            moves.push({indices:[i-1,i], type: "comp"});
            if(array[i - 1] > array[i]) {
                swapped = true;
                moves.push({indices:[i-1,i], type: "swap"});
                var temp = array[i - 1];
                array[i - 1] = array[i];
                array[i] = temp;
            }
        }
    }while(swapped);
    return moves;
}

function selectionSort(array) {
    const moves = [];
    var minIdx;
    for(let i = 0; i < n - 1; i++) {
        minIdx = i;
        for(let j = i + 1; j < n; j++) {
            moves.push({indices:[i,j], type: "comp"});
            if(array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        moves.push({indices:[i,minIdx], type: "swap"});
        [array[minIdx],array[i]] = [array[i],array[minIdx]];
    }
    return moves;
}

function insertionSort(array) {
    const moves = [];
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        key = array[i]; 
        j = i - 1; 
        moves.push({indices:[i,j], type: "comp"});
        while (j >= 0 && array[j] > key)
        {
            moves.push({indices:[j + 1,j], type: "swap"});
            array[j + 1] = array[j]; 
            j--; 
        }
        array[j + 1] = key; 
    } 
    return moves;
}


function showBars(move) {
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if(move && move.indices.includes(i)) {
            bar.style.backgroundColor = 
            move.type == "swap" ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}