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


