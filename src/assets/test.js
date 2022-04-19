const name = {
   firstName: '谦一',
   lastName: '三岛',
};
const obj = {
   name,
};
const {
   name: { firstName, lastName },
} = obj;
// console.log(firstName + lastName);

function Person() {}
Person.prototype.name = '张三';
Person.prototype.age = 35;
Person.prototype.sayHello = function () {
   return 'hello';
};
var per = new Person();
// console.log(per.sayHello());

Object.defineProperty(per, 'newSay', {
   enumerable: false,
   configurable: false,
   writable: false,
   value: function (id) {
      console.log(id);
   },
});
// per.newSay(200000);

function Aplayer() {}
console.log(Aplayer());
function _checkConstructor(fun, Constructor) {
   console.log(this instanceof Constructor);
}
_checkConstructor(this, Aplayer);
