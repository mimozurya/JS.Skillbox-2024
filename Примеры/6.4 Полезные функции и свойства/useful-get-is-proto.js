const obj = new Array();

console.log(Object.getPrototypeOf(obj) === Array.prototype); // три идентичные функции
console.log(Array.prototype.isPrototypeOf(obj));
console.log(obj instanceof Array);
