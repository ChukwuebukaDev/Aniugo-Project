import formatCurrency from "../Scripts/utils/moneyFormating.js";
if(formatCurrency(2095) === '20.95')
    console.log('Test: passed');
else
console.log('Test: failedv');

if(formatCurrency(0 ) === '0.00')
    console.log('passed');
else
console.log('failed');

if(formatCurrency(2000.5) === '20.01')
    console.log('Test: passed');
else
console.log('failed');

    

    