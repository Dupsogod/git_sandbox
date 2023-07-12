(function() {

  const main = document.getElementById('todo-app'); //получаем контейнер всего приложения, который уже создан в файле index.html

  const list = document.createElement('ul') //создаем список, в котором будут выводится задачи
  list.classList.add('ul'); //присваиваем класс этому списку

  //получаем список дел из localStorage, если там ничего нет, то формируем пустой массив
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  //функция для формирования заголовка списка
  function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  //создаем форму с полем для ввода дела, используем form что бы потом использовать событие submit
  function createTodoForm() {
    const container = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    button.textContent = 'добавить дело';
    button.classList.add('btn');
    input.classList.add('input');
    form.classList.add('flex');

    container.append(form);
    form.append(input);
    form.append(button);

    return {
      form,
      input,
      button
    }
  }

  //создаем таймер времени выполнения дела
  function createTimer() {
    const containerTimer = document.createElement('div');
    const inputTimer = document.createElement('input');
    const textTimer = document.createElement('h3');

    textTimer.textContent = 'введите время таймера';
    containerTimer.classList.add('flex');
    inputTimer.classList.add('input');
    textTimer.classList.add('h3');

    containerTimer.append(inputTimer);
    containerTimer.append(textTimer);

    return {
      containerTimer,
      inputTimer,
    }
  }

  //const createTimerInnerText = (numberTimer) => `осталось времени: ${numberTimer}`;
  
  //функция отображения списка дел на странице
  function renderTasks() {
    list.innerHTML = ''; //стираем все значения на странице, чтобы не было дублирования информации

    //запускаем цикл для каждого элемента в массиве tasks
    tasks.forEach((task, index) => {

      //создаем элементы
      const item = document.createElement('li');
      const text = document.createElement('span');
      const textTimer = document.createElement('span');
      const deleteButton = document.createElement('button');

      //наполняем их значениями из task
      text.textContent = task.text;
      textTimer.textContent = task.timer;
      deleteButton.textContent = 'удалить дело';

      //размещаем элементы
      item.append(text);
      item.append(deleteButton);
      list.append(item);
      main.append(list); //"вставляем" задачи в список задач

      //обработчик события для удаления задачи из списка
      deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
    });
  }

  //функция для сохранения значений в localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  //вызываем функции и выводим результат на экран при обновлении/открытии страницы
  document.addEventListener('DOMContentLoaded', function () {
    console.log(tasks);

    const todoAppTitle = createAppTitle('списочек'); //выводим название
    const todoForm = createTodoForm(); //выводим форму для создания задачи
    const todoTimer = createTimer(); //выводим форму для таймера
    
    main.append(todoAppTitle); //"вставляем" название в контейнер сприложение
    todoForm.form.append(todoTimer.containerTimer); //"вставляем" поле с таймером в форму с добавлением дела
    main.append(todoForm.form); //"вставляем" единой форму в контейнер с приложением

    renderTasks(); //вызеваем функцию вывода списка дел

    //функция для добавления новой задачи
    todoForm.form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!todoForm.input.value || !todoTimer.inputTimer.value) {
        return;
      }

      //формируем объект для записи в массив tasks, который в свою очередь мы записываем в localStorage
      const task = {
        text: todoForm.input.value, 
        timer: todoTimer.inputTimer.value,
      }

      tasks.push(task); 

      saveTasks(); //вызываем функцию сохранения данных в localStorage
      renderTasks(); //вызываем функцию, которая "перерисовывает" список задач на странице 

      //очищаем поля для текста и таймера
      todoForm.input.value = '';
      todoTimer.inputTimer.value = '';
    })
  });
})();





