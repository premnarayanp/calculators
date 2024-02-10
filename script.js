var operator = false;
var operandStartIndex = 0;
const query = document.getElementById("query");
const queries = document.getElementById("query-list");
const result = document.getElementById("result");

const buttons = document.querySelectorAll(".row button");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
        //console.log("e=", e.target.getAttribute('class'));
        switch (e.target.getAttribute('class')) {
            case 'number':
                onClickNumberBtn(e);
                break;
            case 'operators':
                onClickOperatorBtn(e);
                break;
            case 'operatorSign':
                onClickOperatorBtn(e);
                break;
            case 'clearDisplay':
                clearDisplay(e);
                break;
            case 'changeSign':
                changeSign(e);
                break;
            case 'onClickEqualBtn':
                onClickEqualBtn(e);
                break;
            default:
                return;
        }
    })
}

//set query and results when any number clicked/any operands presents for calc
const onClickNumberBtn = (event) => {
    const digit = event.target.getAttribute('data-value');
    const queryText = query.value;

    if (queryText.charAt(queryText.length - 1) === ')') {
        const newQuery = queryText.substring(0, queryText.length - 1);
        const finalQuery = newQuery.concat(digit + ')');

        query.value = finalQuery;
        result.innerText = (eval(finalQuery));
        operator = false;
        return;
    }
    // console.log("query=", query.value);
    query.value = queryText.concat(digit);
    result.innerText = eval(queryText + digit)
    operator = false;
}

//set only query when any operator clicked like -,+,*,/,%
const onClickOperatorBtn = (event) => {
    if (operator || query.value === '') {
        return;
    }
    query.value = query.value.concat(event.target.getAttribute('data-value'))
    operator = true;
    operandStartIndex = query.value.length;
}

//set only query in queries array when  clicked "="
const onClickEqualBtn = (event) => {
    if (query.value === '' || operator) {
        return;
    }

    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    li1.innerText = query.value;
    console.log("query=", query.value);
    li2.innerText = "=" + result.innerText;
    query.value = result.innerText;
    queries.appendChild(li1);
    queries.appendChild(li2);
    operandStartIndex = 0;;
    operator = false;
}

//clear Display
const clearDisplay = (event) => {
    result.innerText = "0";
    query.value = "";
    queries.innerText = "";
    operator = false;
    operandStartIndex = 0;
}


//-------------------------change sign---------------------------
const changeSign = (event) => {

    if (query.value === '') {
        return;
    }
    //if  there only single operands in query,not any operator=> just change whole query sign 
    if (operandStartIndex === 0) {
        const newQuery = eval('-1*' + query.value)
        const finalQuery = newQuery < 0 ? `(${newQuery})` : newQuery;
        query.value = finalQuery.toString();
        result.innerText = eval(finalQuery.toString());
        return;
    }

    const newQuery = query.value.substring(0, operandStartIndex + 1);
    const operands = query.value.substring(operandStartIndex + 1);

    //if in query is long but in last ,operands='' means nothing have any number ofter operator=>Don,t required calculation,so return
    if (operands === '') {
        return;
    }
    const finalOperands = eval('-1*' + operands)
    const finalQuery = finalOperands < 0 ? newQuery.concat(`(${finalOperands})`) : newQuery.concat(finalOperands);
    query.value = finalQuery.toString();
    result.innerText = eval(finalQuery.toString());

}