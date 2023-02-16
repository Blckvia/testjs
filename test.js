const data = require('./response');
const moment = require('moment');


// # TASK 1 Нужно сформировать массив уникальных дат (вычленить из поля start)

const uniqueDates = data
  .map((el) => el.start.split(' ')[0])
  .reduce((acc, item) => {
    if (acc.includes(item)) {
      return acc; 
    }
    return [...acc, item]; 
  }, []);

console.log(uniqueDates);

// Другая реализация через Set.
const uniqueDate = Array.from(new Set(data
.map((el) => el.start.split(' ')[0])))


console.log(uniqueDate);




// TASK #2 Подсчитать количество ошибок для каждой даты (получить массив элементов, 
// каждый из которых - количество ошибок, совершенных в соответствующий день). 
// Ошибка определяется, когда поле examInfoCheck равно 0.

const result = [] 
const hashTable = {}; 

for (let i = 0; i < data.length; i++) {
    hashTable[data[i].start.split(' ')[0]] = 0
};

for (elem in hashTable) {
    for (let i = 0; i < data.length; i++) {
        if (elem === data[i].start.split(' ')[0]) {
            const sumErrors = data[i].exam.reduce((acc, el) => el.examInfoCheck === 0 ? acc + 1 : acc, 0);
            hashTable[elem] += sumErrors
        }
    }
}

for (item in hashTable) {
    result.push(hashTable[item]);
}

console.log(result);


// TASK #3

// Не было опыта работы с библиотекой Moment.js. Все ясно по документации, код написан, 
// но почему то с первого объекта дата считывается как Invalid, хотя дата записана в том же виде что и остальные.

const times = data
  .map((el) => moment.duration(moment(el.finish.replace('.', '-')).diff(moment(el.start.replace('.', '-')))).asMinutes())

  //разница в минутах
  console.log(times);