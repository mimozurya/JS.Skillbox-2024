class Student {
    constructor(name, surname, educationStartDate) {
        this.name = name;
        this.surname = surname;
        this.educationStartDate = educationStartDate || new Date();
    }
}

const students = [
    new Student("Тимофей", "Тиунов"),
    new Student("Василий", "Пупкин", new Date(2016, 8, 1)),
];

// экземпляр класса, class instance
