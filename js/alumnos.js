const KEY_STUDENT_LIST = 'studentsList'
const students = document.querySelector("#students tbody")

const btnAll = document.getElementById('btnAll')
btnAll.addEventListener('click',() => {
    const STUDENTS_LIST = JSON.parse(localStorage.getItem(KEY_STUDENT_LIST)) || [];
    showStudents(STUDENTS_LIST)
})

const btnPass = document.getElementById('btnPass')
btnPass.addEventListener('click', () => {
    const STUDENTS_LIST = JSON.parse(localStorage.getItem(KEY_STUDENT_LIST)) || [];
    const passStudents = STUDENTS_LIST.filter((student)=>student.rating >= 6)
    showStudents(passStudents)
})

const btnFail = document.getElementById('btnFail')
btnFail.addEventListener('click', () => {
    const STUDENTS_LIST = JSON.parse(localStorage.getItem(KEY_STUDENT_LIST)) || [];
    const failStudents = STUDENTS_LIST.filter((student)=>student.rating < 6)
    showStudents(failStudents)
})

const btnAverage = document.getElementById('btnAverage')
btnAverage.addEventListener('click',()=>{
    const STUDENTS_LIST = JSON.parse(localStorage.getItem(KEY_STUDENT_LIST)) || [];
    let sum = STUDENTS_LIST.reduce((acumulator, student) => acumulator + parseFloat(student.rating),0)
    let average
    if(STUDENTS_LIST.length === 0){
        average = 0
    } else {
        average = sum / STUDENTS_LIST.length
    }

    if(average >= 6){
        Swal.fire({
            title: 'Promedio de Notas',
            text: `El promedio es ${average}`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    } else {
        Swal.fire({
            title: 'Promedio de Notas',
            text: `El promedio es ${average}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
})

function showStudents(studentsToShow){
    students.innerHTML = ""
    studentsToShow.forEach((student) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <tr>
                <th scope="row">${student.id}</th>
                <td>${student.name}</td>
                <td>${student.rating}</td>
            </tr>
        `
        students.append(tr)
    })
}

fetch('./data/students.data.json')
    .then((res) => res.json())
    .then((data) => {
        const STUDENTS_LIST = JSON.parse(localStorage.getItem(KEY_STUDENT_LIST)) || [];
        if(STUDENTS_LIST.length === 0) {
            data.forEach((student) => {
                STUDENTS_LIST.push(student)
            });
            localStorage.setItem(KEY_STUDENT_LIST, JSON.stringify(STUDENTS_LIST))
        }
    })
    .then(()=>{
        const STUDENTS_LIST = JSON.parse(localStorage.getItem(KEY_STUDENT_LIST)) || [];
        showStudents(STUDENTS_LIST)
    })

