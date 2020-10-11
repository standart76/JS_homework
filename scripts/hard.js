var num = 266219;

num=getArrayNums(num); //получение "массива" разрядов исходного числа

num=getMultiplication(num)**3; //получение перемножения разрядов исходного числа и возведение в 3ю степень

console.log((num+'').substr(0,2)); //вывод в консоль первых двух цифр итогового числа

//функция для получения массива разрядов входящего числа
function getArrayNums(n){
    let arr=[];
    let shiftedNum, resNum;

    do{
        shiftedNum = Math.floor(n / 10); //остаток числа(без последней цифры)
        resNum = n - shiftedNum * 10; //получение последнего разряда числа
        arr.unshift(resNum); //запись в начало массива
        n = shiftedNum;
    } while (n>0);

    return arr;
}

//функция для перемножения элементов объекта
function getMultiplication(n) {
    let res = 1;
    for ( let num in n) {
        res *= n[num];
    }
    return res;
}