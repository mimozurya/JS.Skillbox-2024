const target = {
    name: "Тимофей", // по умолч. все true (enumerable и т.д.)
};

Object.defineProperty(target, "name", {
    value: "Тимофей",
    // get() {}, либо get/set, либо value
    // set(v) {},

    enumerable: false, // ключи объекта?
    writable: false, // можно ли переопределять значения у данного св-ва
    configurable: false, // разрешить/запретить переопределения св-ва с помощью повторного вызова defineProperty
});
