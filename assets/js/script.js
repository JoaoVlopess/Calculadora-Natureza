document.querySelectorAll(".calculator-button").forEach((button) => {
    button.addEventListener("click", atualizarVisor);
})

var visor = document.querySelector(".calculator-display");
var truthTable = document.querySelector(".truth-table");

var arrayVisor = new Array();


var firstProp = ["V", "V", "F", "F"]
var secondProp = ["V", "F", "V", "F"]

var firstNeg = []
var secondNeg = []
negacao(firstProp, firstNeg)
negacao(secondProp, secondNeg)


function atualizarVisor(clickedButton) {
    var buttonValue = clickedButton.currentTarget.getAttribute('data-item');


    if (buttonValue != "=" && buttonValue != "AC") {
        if(buttonValue != "DEL" && arrayVisor.length < 5){
            if ((buttonValue == '⋀' || buttonValue == '⋁' || buttonValue == '⇿' || buttonValue == '⇾') && (arrayVisor.indexOf("⋀")== -1 && arrayVisor.indexOf("⋁")== -1 && arrayVisor.indexOf("⇿")== -1 && arrayVisor.indexOf("⇾")== -1 )) {
                arrayVisor.push(buttonValue);
            } 
            else if((buttonValue == 'p' || buttonValue == 'q' || buttonValue == 'r' || buttonValue == 's')){
                arrayVisor.push(buttonValue);
    
            }else if(buttonValue == '~' && (arrayVisor[arrayVisor.length-1] != '~' && arrayVisor[arrayVisor.length-1] != 'p' && arrayVisor[arrayVisor.length-1] != 'q' && arrayVisor[arrayVisor.length-1] != 'r' && arrayVisor[arrayVisor.length-1] != 's')){
                console.log(arrayVisor[arrayVisor.length-1])
                arrayVisor.push(buttonValue);
     
            }
        }else if (buttonValue == "DEL") {
            arrayVisor.pop();
        }


        let arrayFormatado = arrayVisor.join('');
        visor.innerHTML = arrayFormatado;
    } else if (buttonValue == "=") {
        truthTable.style.display = "flex";
        result();

    } else if (buttonValue == "AC") {
        visor.innerHTML = "";
        maxProp = 0;
        maxNeg = 0;
        arrayVisor = []
    }

}

function result() {
    let displaySize = arrayVisor.length
    let arrayFormatado = arrayVisor.join('');

    for (let i = 1; i <= displaySize; i++) {
        truthTable.innerHTML += `
            <div class="table" data-item="${i}">
                <div class="table-title" data-item="${i}"></div>
                <div class="item" data-item="1"></div>
                <div class="item" data-item="2"></div>
                <div class="item" data-item="3"></div>
                <div class="item" data-item="4"></div>
            </div>
        `

        let table = document.querySelector(`.table[data-item="${i}"]`)
        let tableTitle = table.querySelector(`.table-title[data-item="${i}"]`);
        let truthArray = new Array();

        let isFirstNeg = false;
        let isSecondNeg = false;



        if (displaySize == 4 || displaySize == 2) {
            if (arrayVisor.indexOf("~") == 0 && arrayVisor.indexOf("~", 1) == -1) {
                isFirstNeg = true;
            } else {
                isSecondNeg = true;
            }

        }


        if (displaySize == 5) {
            isFirstNeg = true;
            isSecondNeg = true;
        }


        if (i == 1) {
            if (isFirstNeg == true) {
                tableTitle.innerHTML = arrayVisor[1]
            } else {
                tableTitle.innerHTML = arrayVisor[0]
            }
            for (let i = 1; i <= 4; i++) {
                let item = table.querySelector(`.item[data-item="${i}"]`)
                item.innerHTML = firstProp[i - 1]
            }
        }

        if (i == 2) {
            if (isSecondNeg == true && isFirstNeg == true) {
                tableTitle.innerHTML = arrayVisor[4]
            } else if (isFirstNeg == false && isSecondNeg == false) {
                tableTitle.innerHTML = arrayVisor[2]
            } else {
                tableTitle.innerHTML = arrayVisor[3]
            }
            for (let i = 1; i <= 4; i++) {
                let item = table.querySelector(`.item[data-item="${i}"]`)
                item.innerHTML = secondProp[i - 1]
            }
            if (displaySize == 2) {
                tableTitle.innerHTML = arrayVisor[0] + arrayVisor[1]
                for (let i = 1; i <= 4; i++) {
                    let item = table.querySelector(`.item[data-item="${i}"]`)
                    item.innerHTML = firstNeg[i - 1]
                }
            }
        }

        if (i == 3) {
            if (isFirstNeg == false && isSecondNeg == false) {
                tableTitle.innerHTML = `${arrayFormatado[0]} ${arrayFormatado[1]} ${arrayFormatado[2]}`

                let operador = arrayVisor[1]

                switch (operador) {
                    case "⋀":
                        conjuncao(firstProp, secondProp, truthArray);
                        break;
                    case "⋁":
                        disjuncao(firstProp, secondProp, truthArray);
                        break;
                    case "⇾":
                        condicional(firstProp, secondProp, truthArray);
                        break;
                    default:
                        bicondicional(firstProp, secondProp, truthArray);
                }

                for (let i = 1; i <= 4; i++) {
                    let item = table.querySelector(`.item[data-item="${i}"]`)
                    item.innerHTML = truthArray[i - 1]
                }

            }
            if ((isFirstNeg == true && isSecondNeg == false) || (isFirstNeg == true && isSecondNeg == true)) {
                tableTitle.innerHTML = `${arrayFormatado[0]} ${arrayFormatado[1]}`

                for (let i = 1; i <= 4; i++) {
                    let item = table.querySelector(`.item[data-item="${i}"]`);
                    item.innerHTML = firstNeg[i - 1];
                }
            }

            if (isFirstNeg == false && isSecondNeg == true) {
                tableTitle.innerHTML = `${arrayFormatado[2]} ${arrayFormatado[3]}`

                for (let i = 1; i <= 4; i++) {
                    let item = table.querySelector(`.item[data-item="${i}"]`);
                    item.innerHTML = secondNeg[i - 1];
                }
            }

        }

        if (i == 4) {
            if (isFirstNeg == true && isSecondNeg == false) {
                tableTitle.innerHTML = `${arrayFormatado[0]} ${arrayFormatado[1]} ${arrayFormatado[2]} ${arrayFormatado[3]}`

                let operador = arrayVisor[2]

                switch (operador) {
                    case "⋀":
                        conjuncao(firstNeg, secondProp, truthArray);
                        break;
                    case "⋁":
                        disjuncao(firstNeg, secondProp, truthArray);
                        break;
                    case "⇾":
                        condicional(firstNeg, secondProp, truthArray);
                        break;
                    default:
                        bicondicional(firstNeg, secondProp, truthArray);
                }

                for (let i = 1; i <= 4; i++) {
                    let item = table.querySelector(`.item[data-item="${i}"]`);

                    item.innerHTML = truthArray[i - 1];
                }

            }
            else if (isFirstNeg == false && isSecondNeg == true) {
                tableTitle.innerHTML = `${arrayFormatado[0]} ${arrayFormatado[1]} ${arrayFormatado[2]} ${arrayFormatado[3]}`

                let operador = arrayVisor[1]

                switch (operador) {
                    case "⋀":
                        conjuncao(firstProp, secondNeg, truthArray);
                        break;
                    case "⋁":
                        disjuncao(firstProp, secondNeg, truthArray);
                        break;
                    case "⇾":
                        condicional(firstProp, secondNeg, truthArray);
                        break;
                    default:
                        bicondicional(firstProp, secondNeg, truthArray);
                }

                for (let i = 1; i <= 4; i++) {
                    let item = table.querySelector(`.item[data-item="${i}"]`);

                    item.innerHTML = truthArray[i - 1];
                }

            }
            else if (isFirstNeg == true && isSecondNeg == true) {
                tableTitle.innerHTML = `${arrayFormatado[3]} ${arrayFormatado[4]} `

                for (let i = 1; i <= 4; i++) {
                    let item = table.querySelector(`.item[data-item="${i}"]`);
                    item.innerHTML = secondNeg[i - 1];
                }
            }



        }

        if (i == 5) {
            tableTitle.innerHTML = `${arrayFormatado[0]} ${arrayFormatado[1]} ${arrayFormatado[2]} ${arrayFormatado[3]} ${arrayFormatado[4]}`
            let operador = arrayVisor[2]

            switch (operador) {
                case "⋀":
                    conjuncao(firstNeg, secondNeg, truthArray);
                    break;
                case "⋁":
                    disjuncao(firstNeg, secondNeg, truthArray);
                    break;
                case "⇾":
                    condicional(firstNeg, secondNeg, truthArray);
                    break;
                default:
                    bicondicional(firstNeg, secondNeg, truthArray);
            }

            for (let i = 1; i <= 4; i++) {
                let item = table.querySelector(`.item[data-item="${i}"]`);

                item.innerHTML = truthArray[i - 1];
            }

        }

    }

}

function negacao(array, array2) {
    for (let i = 0; i < 4; i++) {
        if (array[i] == "V") {
            array2[i] = "F"
        }
        else if (array[i] == "F") {
            array2[i] = "V"
        }
    }
    return array2;
}

function conjuncao(array1, array2, array3) {
    for (let i = 0; i < 4; i++) {
        if (array1[i] == "V" && array2[i] == "V") {
            array3[i] = "V"
        } else {
            array3[i] = "F"
        }
    }
    return array3;
}

function disjuncao(array1, array2, array3) {
    for (let i = 0; i < 4; i++) {
        if (array1[i] == "F" && array2[i] == "F") {
            array3[i] = "F"
        } else {
            array3[i] = "V"
        }
    }
    return array3;
}

function condicional(array1, array2, array3) {
    for (let i = 0; i < 4; i++) {
        if (array1[i] == "V" && array2[i] == "F") {
            array3[i] = "F"
        } else {
            array3[i] = "V"
        }
    }
    return array3;
}

function bicondicional(array1, array2, array3) {
    for (let i = 0; i < 4; i++) {
        if ((array1[i] == "F" && array2[i] == "F") || (array1[i] == "V" && array2[i] == "V")) {
            array3[i] = "V"
        } else {
            array3[i] = "F"
        }
    }
    return array3;
}




