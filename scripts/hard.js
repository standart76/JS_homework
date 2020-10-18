'use strict';
//#1
const arr = ['123642', '237906', '796031', '1346975', '23549681', '4660247', '5465137'];

for(let a of arr){
    if(a.charAt(0) === '2' || a.charAt(0) === '4'){
        console.log( a);
    }
}

//#2
numSimple:
for(let i = 2; i <= 100; i++){
        for(let j = 2; j <= Math.sqrt(i); j++){
            if(i % j === 0){
                continue numSimple;
            }
        }
        console.log('Число ', i, 'Делители этого числа: 1 и', i);
}