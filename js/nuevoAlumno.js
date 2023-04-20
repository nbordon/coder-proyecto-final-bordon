class Student {
    constructor(name, lastName, rating) {
        studentLastId++
        this.id = studentLastId
        this.name = `${name} ${lastName}`
        this.rating = rating
    }
}

function createStudent(name, lastName, rating) {
    return new Student(name, lastName, rating)
}

function saveStudent(student) {
    const students = JSON.parse(localStorage.getItem(KEY_STUDENT_LIST)) || [];
    students.push(student)
    localStorage.setItem(KEY_STUDENT_LIST, JSON.stringify(students))
    localStorage.setItem(KEY_SUDENT_ID, studentLastId)
}

const KEY_STUDENT_LIST = 'studentsList'
const KEY_SUDENT_ID = 'studentId'
let studentLastId = parseInt(localStorage.getItem(KEY_SUDENT_ID)) || 2

const btnConfirm = document.getElementById('confirm');
btnConfirm.addEventListener('click', () => {
    
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const rating = parseFloat(document.getElementById('rating').value)

    const student = createStudent(name, lastName, rating)

    saveStudent(student)
})

const btnCancel = document.getElementById('cancel')
btnCancel.addEventListener('click', () => window.location.href = 'alumnos.html')