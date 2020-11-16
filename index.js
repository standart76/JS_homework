'use strict';

const DomElement = function(h,w,bg,fs,s){
    this.selector = s || 'error';
    this.height = h || 100; 
    this.width = w || 100; 
    this.bg = bg || 'red'; 
    this.fontSize = fs || '16';
    this.createElem = function(){
        if(this.selector[0] === '.'){
            let elem = document.createElement('div');
            elem.className = this.selector.slice(1);
            elem.textContent = 'this is a new object with class = ' + elem.className;
            elem.style.cssText = `height:${this.height}px;width:${this.width}px;background-color:${this.bg};font-size:${this.fontSize}px;`;
            document.body.appendChild(elem);
        }else if(this.selector[0] === '#'){
            let elem = document.createElement('div');
            elem.id  = this.selector.slice(1);
            elem.textContent = 'this is a new object with id = ' + elem.id;
            elem.style.cssText = `height:${this.height}px;width:${this.width}px;background-color:${this.bg};font-size:${this.fontSize}px;`;
            document.body.appendChild(elem);
        }else{
            console.log('Ошибка в передаваемом селекторе!');
        }
    };
};

const elem1 = new DomElement(100,100,'blue',14,'.testCLASS');
elem1.createElem();

const elem2 = new DomElement(150,400,'green',24,'#testID');
elem2.createElem();