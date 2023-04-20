const classes = document.querySelector("#classes tbody")

fetch('./data/classes.data.json')
    .then((res) => res.json())
    .then((data => {
        data.forEach( (course) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <tr>
                    <th scope="row">${course.id}</th>
                    <td>${course.description}</td>
                    <td>${course.students}</td>
                </tr>
            `
            classes.append(tr)
        });
    }))