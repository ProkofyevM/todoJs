document.addEventListener('DOMContentLoaded', () => {
   
   let day = new Date();
   day.setDate(day.getDate() + 1);

   const hoursVal = document.querySelector('.time-count__hours .time-count__val');
   const minutesVal = document.querySelector('.time-count__minutes .time-count__val');
   const secondsVal = document.querySelector('.time-count__seconds .time-count__val');

   const hoursText = document.querySelector('.time-count__hours .time-count__text');
   const minutesText = document.querySelector('.time-count__minutes .time-count__text');
   const secondsText = document.querySelector('.time-count__seconds .time-count__text');

   function declOfNum(number, titles) {  
      let cases = [2, 0, 1, 1, 1, 2];  
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
   }

   const timeCount = () => {
      let now = new Date();
      let leftUntil = day - now;

      let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
      let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
      let seconds = Math.floor(leftUntil / 1000) % 60;

      (hours < 10) ? hours = `0 ${hours}` : 'help';
      (minutes < 10) ? minutes = `0 ${minutes}` : 'help';
      (seconds < 10) ? seconds = `0 ${seconds}` : 'help';

      hoursVal.textContent = hours;
      minutesVal.textContent = minutes;
      secondsVal.textContent = seconds;


      hoursText.textContent = declOfNum (hours, ['час', 'часа', 'часов']);
      minutesText.textContent = declOfNum (minutes, ['минута', 'минуты', 'минут']);
      secondsText.textContent = declOfNum (seconds, ['секунда', 'секунды', 'секунд']);
   }

   timeCount();
   setInterval(timeCount, 1000);
});

const bt = document.querySelector('.bt');
const input = document.querySelector('.inp');
const ul = document.querySelector('.list');
const total = document.querySelector('.total');
let tasks;

(localStorage.tasks) ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];

function Task(discription) {
   this.discription = discription;
   this.done = false;
};

const createElem = (task, i) => {
   const li = document.createElement('li');
   const inp = document.createElement('input');
   const span = document.createElement('span');
   const item = document.createElement('div');
   const btn = document.createElement('button');

   task.done ? li.classList.add('li-active', 'li') : li.classList.add('li');
   btn.classList.add('btn');
   inp.type = 'checkbox';
   task.done ? inp.checked = true : inp.checked = false;

   span.textContent = task.discription;
   btn.textContent = 'del';

   ul.append(li);
   li.append(span, item);
   item.append(inp, btn);

   inp.addEventListener('click', () => {
      task.done = !task.done;
      (task.done) ? li.classList.toggle('li-active') : li.classList.remove('li-active');
      updateLocalStoradge();
   });

   btn.addEventListener('click', () => {
      tasks.splice(i, 1);
      li.remove();
      updateLocalStoradge();
   });
};

const insertElem = () => {
   ul.innerHTML = '';
   if (tasks.length > 0) {
      tasks.forEach((elem, i) => {
         createElem(elem, i);
      });
   };
};

insertElem();

const updateLocalStoradge = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks));
};

bt.addEventListener('click', () => {
   if (input.value !== '') {
      tasks.push(new Task(input.value));
   };
   updateLocalStoradge();
   insertElem();
   input.value = '';
});


