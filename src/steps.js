"use strict";

console.log('JS inyectado');

const checkbox_paypal = document.getElementById('paypal_check');
const checkbox_cc = document.getElementById('cc_check');
const step_3 = document.getElementById('step_3');
const step_4 = document.getElementById('step_4');
const step_4_addr = document.getElementById('step_4_shipping')
const step_5 = document.getElementById('step_5')
const product_1 = document.getElementById('check_1');
const product_2 = document.getElementById('check_2');
const product_3 = document.getElementById('check_3');
const product_4 = document.getElementById('check_4');
const product_5 = document.getElementById('check_5');
const products  = [product_1,product_2,product_3,product_4,product_5];
const checkbox_shipping_addr = document.getElementById('shipping_addr');
const checkbox_diff_addr     = document.getElementById('diff_addr');
// slider
const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length -1];
const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
slider.insertAdjacentElement("afterbegin",sliderSectionLast);
// countries
let Country_Selector = document.getElementById('country_selector');


step_3.style.display = 'none';
step_4.style.display = 'none';
step_4_addr.style.display = 'none'
step_5.style.display = 'none';

let Countries = [];

//  Obtencion de paises para choose
fetch('https://restcountries.com/v3.1/all').then(function (response) {
	console.log('success!');
    return response.json();
}).then(function (data) {
    try {

        for (const iterator of data) {
            const obj = {};
            obj.name = iterator.name?.common;
            obj.ext  = iterator.idd?.root;
            if (!obj.name || !obj.ext) continue;
            
            try {
                const subfix = obj.ext + iterator.idd?.suffixes[0];
                obj.ext = subfix
            } catch (error) {
                console.log('errorconcat')
                obj.ext.concat('-')
            }
            Countries.push(obj)
        }
        
    } catch (error) {   
        console.log(error);
    }
}).catch(function (err) {
	console.warn('Something went wrong.', err);
});

Country_Selector.addEventListener('click', (e)=>{
    
        Countries.map(country=>{
            const option = document.createElement('option');
            option.innerHTML = country.name;
            Country_Selector.appendChild(option);
        })
      
});

// ---------------------------------------
checkbox_paypal.addEventListener('change', (e)=>{
    e.preventDefault();
    checkbox_cc.checked = false;
    step_3.style.display = 'block';
    step_5.style.display = 'block';
    
    
    step_4.style.display = 'block';
    step_4_addr.style.display  = 'none';
    
});


checkbox_cc.addEventListener('change', (e)=>{
    e.preventDefault();
    checkbox_paypal.checked = false;


    step_3.style.display = 'block';
    step_4.style.display = 'none';
    step_4_addr.style.display  = 'block'; 
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
        
    })
}

checkbox_shipping_addr.addEventListener('change',(e)=>{
    checkbox_diff_addr.checked = false;

});

checkbox_diff_addr.addEventListener('change',(e)=>{
    checkbox_shipping_addr.checked = false;
});


var manualNav = function (manual) {
    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
}

//  ---------------------------------  Slider --------------------

function Next() {
    let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function () {
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend',sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500)
}

function Prev() {
    let sliderSection = document.querySelectorAll(".slider__section");
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = "0%";
    slider.style.transition = "all 0.5s";
    setTimeout(function () {
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin',sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 500)
}

btnRight.addEventListener('click', Next);

btnLeft.addEventListener('click', Prev);

//------------------------------------------------------------------

