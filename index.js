'use strict';

const booksList = document.querySelector('.books'),
books = document.querySelectorAll('.book'),
listSecondBook = books[0].querySelectorAll('li'),
listFifthBook = books[5].querySelectorAll('li'),
listSixthBook = books[2].querySelectorAll('li'),
newListItem = listSixthBook[9].cloneNode(true);


booksList.prepend(books[1]);
booksList.append(books[2]);
books[3].before(books[4]);

document.body.style.backgroundImage = "url(/image/you-dont-know-js.jpg)";

books[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove();

listSecondBook[9].after(listSecondBook[2]);
listSecondBook[3].after(listSecondBook[6]);
listSecondBook[6].after(listSecondBook[8]);

listFifthBook[1].after(listFifthBook[9]);
listFifthBook[4].after(listFifthBook[2]);
listFifthBook[7].after(listFifthBook[5]);


newListItem.textContent = 'Глава 8: За пределами ES6';
listSixthBook[9].before(newListItem);

