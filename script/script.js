window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
            timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
            timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
            if (timer.timeRemaining < 0) {
                clearInterval(numInt);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        }

        let numInt = setInterval(updateClock, 1000);

    }
    countTimer('01 Januar 2021');

    //menu
    const toggleMenu = function () {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            btnClose = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul > li');
           
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
       
        menu.addEventListener('click', (event)=>{
            let target = event.target;
            if(target.tagName === 'A'){
                handlerMenu();
            }
        });
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');
            let count = -40;
        const animatePopupIn = () =>{
            if(window.screen.width > 768){
                popupContent.style.top = count+'%';
                popup.style.display = 'block';
                let id = setInterval(function(){
                    if(count < 10){
                        count+=2;
                        popupContent.style.top = count+'%';
                    }else{
                        clearInterval(id);
                    }
                }, 30);//id setinterval
            }else{
                popup.style.display = 'block';
            }
        };

        const popupCloseFunc = ()=>{
            popup.style.display = 'none';
            count = -40;
        };
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                animatePopupIn(); 
            });
        });

        popup.addEventListener('click', (event)=>{
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popupCloseFunc();
            }else{
                target = target.closest('.popup-content');
                if(!target){
                    popupCloseFunc();
                }
            }
            
        });
    };
    togglePopup();

    //tabs
    const tabs = () =>{
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = (index) =>{
            for(let i=0; i< tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click',(event)=>{
            let target = event.target.closest('.service-header-tab');
                if(target){
                    tab.forEach((item,i)=>{
                        if(item === target){
                            toggleTabContent(i);
                        }
                    });
                }else{
                    target = target.parentNode;
                }
        });

    };
    tabs();


});