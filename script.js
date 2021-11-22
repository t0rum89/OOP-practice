/* ООП в функциональном стиле
Создайте базовый класс Figure, который будет хранить координаты (x, y) и цвет фигуры. На базе класса Figure создайте три класса – Line, Rect, Circle, каждый из которых создает соответствующую фигуру. Пример создания экземпляров каждого класса и параметры фигур:

var line = new Line(50, 250, 200, 200, 'red'); // x1, y1, x2, y2, color
var circle = new Circle(120, 120, 50, 'green'); // x, y, r, color
var rect = new Rect(260, 130, 60, 120, 'blue'); // x, y, w, h, color

Все три класса-наследника имеют метод draw для рисования фигуры с соответствующими параметрами (координаты, размеры, цвет).

Фигуры рисуются на Canvas. Для рисования на канвасе создайте еще один класс – Canvas, в котором инициализируется элемент <canvas> из DOM. Класс Canvas – final, он не наследуется. В этом классе есть метод add, который и отображает созданные вами фигуры на странице. Обратите внимание, добавлять фигуры на канвас можно как по отдельности, так и списком.

var drawArea = new Canvas('canvasID');
drawArea.add(line);
drawArea.add(circle, rect);

<canvas id="canvasID"></canvas> */

function Figure(x1, y1, color) {
  this.x1 = x1;
  this.y1 = y1;
  this.color = color;
}

function Line(x1, y1, x2, y2, color) {
  Figure.call(this, x1, y1, color); // правильно ли наследоваться через call(apply) в таком случае? или надо использовать .prototype? (но это вроде уже прототипное ООП...)
  this.x2 = x2;
  this.y2 = y2;
  this.draw = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };
}

function Rect(x1, y1, w, h, color) {
  Figure.call(this, x1, y1, color);
  this.w = w;
  this.h = h;
  this.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x1, this.y1, this.w, this.h);
  };
}

function Circle(x1, y1, r, color) {
  Figure.call(this, x1, y1, color);
  this.r = r;
  this.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x1, this.y1, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };
}

const line = new Line(50, 250, 200, 200, "red");
const rect = new Rect(260, 130, 60, 120, "blue");
const circle = new Circle(120, 120, 50, "green");

function Canvas(id) {
  this.ctx = document.getElementById(id).getContext("2d");
  this.add = function () {
    for (let i = 0; i < arguments.length; i++) {
      arguments[i].draw(this.ctx);
    }
  };
}

let drawArea = new Canvas("canvasID");
drawArea.add(line);
drawArea.add(rect, circle);
