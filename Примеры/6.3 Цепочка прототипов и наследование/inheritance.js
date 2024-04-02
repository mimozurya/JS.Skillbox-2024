// class Human {
//     constructor(name, surname, birthDate) {
//         this.name = name;
//         this.surname = surname;
//         this.birthDate = birthDate;
//     }

//     getFullName() {
//         return `${this.name} ${this.surname}`;
//     }

//     printBirthDate() {
//         console.log(this.birthDate);
//     }
// }

function Human(name, surname, birthDate) {
    this.name = name;
    this.surname = surname;
    this.birthDate = birthDate;
}
Object.assign(Human.prototype, {
    getFullName() {
        return `${this.name} ${this.surname}`;
    },

    printBirthDate() {
        console.log(this.birthDate);
    },
});

// class Student extends Human {
//     constructor(name, surname, birthDate, grade) {
//         super(name, surname, birthDate);
//         this.grade = grade;
//     }

//     getRemainingGrades() {
//         return 4 - this.grade;
//     }
// }

function Student(name, surname, birthDate, grade) {
    Human.call(this, name, surname, birthDate);
    // super(name, surname, birthDate); - не можем использовать super без класса
    this.grade = grade;
}

Object.assign(Student.prototype, {
    getRemainingGrades() {
        return 4 - this.grade;
    },
});

Object.setPrototypeOf(Student.prototype, Human.prototype); // чтобы имел доступ к родителю
