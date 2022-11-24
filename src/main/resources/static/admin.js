const urlAdmin = 'http://localhost:8080/admin/api/users/'
const allUsers = document.getElementById('tBodyAllUsers')

// Заполнение страницы
let allUserTable = () => {
    fetch(urlAdmin)
        .then(response => response.json())
        .then(result => {
            let usersHTML = ''
            for (let i = 0; i < result.length; i++) {
                let rolesUser = ''
                for (let j = 0; j < result[i].roles.length; j++) {
                    rolesUser += `${result[i].roles[j].role} `
                }
                usersHTML += `
                <tr>
                    <td class="align-middle">${result[i].id}</td>
                    <td class="align-middle">${result[i].firstName}</td>
                    <td class="align-middle">${result[i].lastName}</td>
                    <td class="align-middle">${result[i].age}</td>
                    <td class="align-middle">${result[i].email}</td>
                    <td class="align-middle">${rolesUser}</td>
                    <td class="align-middle">
                        <button type="button" class="btn btn-primary" 
                        onclick="showEditModal(this)" data-id="${result[i].id}">Edit</button>
                    </td>
                    <td class="align-middle">
                        <button type="button" class="btn btn-danger" 
                        onclick="showDeleteModal(this)" data-id="${result[i].id}">Delete</button>
                    </td>
                </tr>`
            }
            allUsers.innerHTML = usersHTML
        })
}

// Событие при нажатие Edit в таблице пользователей
function showEditModal(elem){
    console.log(elem.dataset.id)
    let id = elem.dataset.id
    fetch(urlAdmin + id)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            //document.forms.formEdit.age.value = result.id
            const formEdit = document.forms.formEdit
            formEdit.idEdit.value = result.id
            formEdit.nameEdit.value = result.firstName
            formEdit.lastNameEdit.value = result.lastName
            formEdit.ageEdit.value = result.age
            formEdit.emailEdit.value = result.email
            formEdit.passwordEdit.value = result.password
        })
    $('#modalEdit').modal('show')
}

// Событие при нажатие Delete в таблице пользователей
function showDeleteModal(elem){
    console.log(elem.dataset.id)
    let id = elem.dataset.id
    fetch(urlAdmin + id)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            //document.forms.formDelete.age.value = result.id
            const formDelete = document.forms.formDelete
            formDelete.idDelete.value = result.id
            formDelete.nameDelete.value = result.firstName
            formDelete.lastNameDelete.value = result.lastName
            formDelete.ageDelete.value = result.age
            formDelete.emailDelete.value = result.email
            formDelete.passwordDelete.value = result.password
        })
    $('#modalDelete').modal('show')
}

allUserTable()