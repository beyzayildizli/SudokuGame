const level1Boards = [
    [
        [0, 1, 0, 2],
        [3, 0, 1, 0],
        [0, 0, 0, 1],
        [1, 4, 2, 0]
    ],
    [
        [0, 0, 0, 3],
        [0, 4, 0, 0],
        [0, 0, 3, 2],
        [0, 0, 0, 0]
    ],
    [
        [3, 0, 4, 0],
        [0, 1, 0, 2],
        [0, 4, 0, 3],
        [2, 0, 1, 0]
    ]
];

const level2Boards = [
    [
        [6, 0, 2, 0, 4, 0],
        [0, 3, 0, 2, 6, 0],
        [1, 0, 0, 0, 2, 3],
        [2, 0, 3, 1, 0, 0],
        [0, 2, 0, 5, 0, 4],
        [0, 5, 1, 6, 0, 0]
    ],
    [
        [1, 0, 3, 4, 0, 0],
        [0, 6, 0, 1, 3, 0],
        [0, 5, 0, 0, 1, 0],
        [6, 0, 1, 5, 0, 4],
        [3, 1, 0, 2, 0, 5],
        [0, 4, 0, 0, 6, 0]
    ]
];

const level3Boards = [
    [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
];

let currentLevel = 1;
let currentBoard;

// Rastgele bir Level tablosunu seç
function getBoardByLevel(level) {
    if (level === 1) {
        return level1Boards[Math.floor(Math.random() * level1Boards.length)];
    } else if (level === 2) {
        return level2Boards[Math.floor(Math.random() * level2Boards.length)];
    } else if (level === 3) {
        return level3Boards[Math.floor(Math.random() * level3Boards.length)];
    }
}

function createSudokuTable(board) {
    const table = document.getElementById("sudokuTable");
    table.innerHTML = ''; // Tabloyu temizle

    const size = board.length;
    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.className = "inputCell";
            input.type = "text";
            input.maxLength = 1;

            if (board[i][j] !== 0) {
                input.value = board[i][j];
                input.disabled = true;
            }

            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function changeLevel() {
    tamamlananLeveller();
    stopTimer();
    const endTime = new Date(); // Yeni seviye bitiş zamanını al
    startTime = endTime; // Yeni seviye başlangıç zamanını güncelle
    startTimer();

    currentLevel++;
    if (currentLevel > 3) {
        var totalTime = completedLevelTimes.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);

        window.location.href = "end.html?totalTime=" + totalTime;

    }
    currentBoard = getBoardByLevel(currentLevel);
    createSudokuTable(currentBoard);
    document.getElementById("levelLabel").innerText = "Level: " + currentLevel;
}

function getSudokuArray() {
    // Yeni değerleri al
    const table = document.getElementById("sudokuTable");
    const inputs = table.getElementsByTagName("input");
    const size = Math.sqrt(inputs.length);

    // Girilen değerleri bir matrise yerleştir
    const userValues = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const index = i * size + j;
            const value = parseInt(inputs[index].value) || 0;
            row.push(value);
        }
        userValues.push(row);
    }

    return userValues;
}



function checkSudoku() {
    const dizi = getSudokuArray();

    function checkSolution(array) {
        const boyut = dizi.length;

        // Satırları kontrol et
        for (let i = 0; i < boyut; i++) {
            const satir = new Set();
            for (let j = 0; j < boyut; j++) {
                if (dizi[i][j] < 1 || dizi[i][j] > boyut || satir.has(dizi[i][j])) {
                    return false;
                }
                satir.add(dizi[i][j]);
            }
        }

        // Sütunları kontrol et
        for (let j = 0; j < boyut; j++) {
            const sutun = new Set();
            for (let i = 0; i < boyut; i++) {
                if (dizi[i][j] < 1 || dizi[i][j] > boyut || sutun.has(dizi[i][j])) {
                    return false;
                }
                sutun.add(dizi[i][j]);
            }
        }

        return true;
    }

    function aralikKontrolu(dizi) {
        const boyut = dizi.length;
        for (let i = 0; i < boyut; i++) {
            for (let j = 0; j < dizi[i].length; j++) {
                if (dizi[i][j] < 1 || dizi[i][j] > boyut) {
                    return false;
                }
            }
        }
        return true;
    }

    if (dizi.flat().includes(0)) {
        alert("Tüm boşlukları doldur!");
    } else if (aralikKontrolu(dizi) == false) {
        alert(`Sadece 1 ve ${dizi.length} arasında değerler girin.`);
    } else if (checkSolution() == false) {
        alert(`Çözümünüz yanlış!`);
    } else {
        changeLevel();
    }
}

let startTime; // Level başlangıç zamanını tutmak için değişken
let intervalId; // Zamanlayıcıyı tutmak için değişken

function startTimer() {
    intervalId = setInterval(function () {
        const endTime = new Date();
        const elapsedTime = Math.floor((endTime - startTime) / 1000);
        document.getElementById("elapsedTime").innerText = "Süre: " + elapsedTime + " sn";
    }, 1000); // Her 1 saniyede bir güncelle
}

function stopTimer() {
    clearInterval(intervalId);
}

let completedLevels = [];
let completedLevelTimes = [];

function tamamlananLeveller() {
    // Eğer bu seviye daha önce tamamlanmışsa tekrar eklemeyi engelle
    if (!completedLevels.includes(currentLevel)) {
        completedLevels.push(currentLevel);

        // Bu seviyenin tamamlanma süresini hesapla ve diziye ekle
        const endTime = new Date();
        const elapsedTime = Math.floor((endTime - startTime) / 1000);
        completedLevelTimes.push(elapsedTime);

        // Tamamlanan levelleri göstermek için bir div oluştur
        const completedLevelsDiv = document.getElementById("completedLevelsDiv");

        // Div içeriğini temizle
        completedLevelsDiv.innerHTML = '';

        // Levelleri alt alta ekleyerek div içine ekleyin
        completedLevels.forEach((level, index) => {
            const levelElement = document.createElement("div");
            const timeElement = document.createElement("span");

            // Level ve tamamlanma süresini ekleyin
            levelElement.innerText = "Level " + level;
            timeElement.innerText = " - " + completedLevelTimes[index] + " sn";

            levelElement.appendChild(timeElement);
            completedLevelsDiv.appendChild(levelElement);
        });
    }
}

startTime = new Date(); // Yeni seviye başlangıç zamanını al
startTimer();
currentBoard = getBoardByLevel(1);
createSudokuTable(currentBoard);
