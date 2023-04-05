"use strict";

console.log('JS inyectado');

const checkbox_paypal = document.getElementById('paypal_check');
const checkbox_cc = document.getElementById('cc_check');
const step_3 = document.getElementById('step_3');
const step_4 = document.getElementById('step_4');
const product_1 = document.getElementById('check_1');
const product_2 = document.getElementById('check_2');
const product_3 = document.getElementById('check_3');
const product_4 = document.getElementById('check_4');
const product_5 = document.getElementById('check_5');
const products  = [product_1,product_2,product_3,product_4,product_5];


step_3.style.display = 'none';
step_4.style.display = 'none';


checkbox_paypal.addEventListener('change', (e)=>{
    e.preventDefault();
    checkbox_cc.checked = false
    console.log('Checkbox paypal change');
    step_3.style.display = 'block';
    
    if (checkbox_paypal.checked) {
        step_4.style.display = 'block';
    }
});


checkbox_cc.addEventListener('change', (e)=>{
    e.preventDefault();
    checkbox_paypal.checked = false
    console.log('Checkbox cc change');

    step_3.style.display = 'block';
    step_4.style.display = 'none';
});


for (let index = 0; index < products.length  ; index++) {
    const element = products[index];
    element.addEventListener('change',(e)=>{
        e.preventDefault();
        product_1.checked = false;
        product_2.checked = false;
        product_3.checked = false;
        product_4.checked = false;
        product_5.checked = false;
        element.checked   = true;
        console.log('product check')
    })
}