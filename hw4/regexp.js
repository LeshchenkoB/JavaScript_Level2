/*
* Задание 1
* Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
* Придумать шаблон, который заменяет одинарные кавычки на двойные.
* */

let str = 'Lorem ipsum dolor sit amet, consectetur \'adipisicing\' elit. Aspernatur at corporis earum iure modi voluptatibus.';
console.log(str);
const regexp = /\'/g;
console.log(str.replace(regexp, "\""));

/*
* Задание 2
* Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
* */
let str2 = 'Lorem ipsum dolor sit amet, aren\'t consectetur \'adipisicing\' elit. Aspernatur \'at\' corpor\'is earum iure modi voluptatibus.';
console.log(str2);
const regexp2 = /\B\'|\'\B/g;
console.log(str2.replace(regexp2, "\""));
/*
* не понятно, почему нужна заглавная B, ведь она означает "Не граница слова". Нашел решение методом "тыка"
* Как я понял такая регулярка должна читаться так "найди и замени одинарную кавычку,
* которая находится "не на границе слова" на двойную кавычку".
* Т.е. наоборот должна была замениться кавычка внутри слова, а не по бокам.
* */