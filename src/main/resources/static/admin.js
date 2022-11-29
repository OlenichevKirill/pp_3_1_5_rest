const urlAdmin = 'http://localhost:8080/admin/api/users/'
const allUsers = document.getElementById('tBodyAllUsers')
let allRoles = []

//Получаем все роли
fetch(urlAdmin + "roles")
    .then(response => response.json())
    .then(result => {
        for (let i = 0; i < result.length; i++) {
            allRoles.push(result[i])
        }
    })

// Заполнение данных на админской панеле
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
            addOption('roleNew')
        })
}

allUserTable()

// Создание и внедрение option в select
function addOption(id) {
    let selectHTML = ''
    for (let i = 0; i < allRoles.length; i++) {
        if (id === 'roleDelete') {
            selectHTML += `<option value="${allRoles[i].id}" readonly>${allRoles[i].role}</option>`
        } else {
            selectHTML += `<option value="${allRoles[i].id}">${allRoles[i].role}</option>`
        }
    }
    document.getElementById(id).innerHTML = selectHTML
}

// Событие при нажатие Edit в таблице пользователей
function showEditModal(elem) {
    let id = elem.dataset.id
    fetch(urlAdmin + id)
        .then(response => response.json())
        .then(result => {
            const formEdit = document.forms.formEdit
            formEdit.idEdit.value = result.id
            formEdit.nameEdit.value = result.firstName
            formEdit.lastNameEdit.value = result.lastName
            formEdit.ageEdit.value = result.age
            formEdit.emailEdit.value = result.email
            formEdit.passwordEdit.value = result.password
        })
    addOption('roleEdit')
    $('#modalEdit').modal('show')
}

// Событие при нажатие Delete в таблице пользователей
function showDeleteModal(elem) {
    let id = elem.dataset.id
    fetch(urlAdmin + id)
        .then(response => response.json())
        .then(result => {
            const formDelete = document.forms.formDelete
            formDelete.idDelete.value = result.id
            formDelete.nameDelete.value = result.firstName
            formDelete.lastNameDelete.value = result.lastName
            formDelete.ageDelete.value = result.age
            formDelete.emailDelete.value = result.email
            formDelete.passwordDelete.value = result.password
        })
    addOption('roleDelete')
    $('#modalDelete').modal('show')
}

//Событие сохранения newUser
function saveUser() {
    const formCreat = document.forms.formCreat
    let rolesNewUser = []

    for (let i = 0; i < formCreat.roleNew.options.length; i++) {
        if (formCreat.roleNew.options[i].selected) {
            let role = {
                id: formCreat.roleNew.options[i].value,
                role: formCreat.roleNew.options[i].textContent
            }
            rolesNewUser.push(role)
        }
    }

    let User = {
        firstName: formCreat.name.value,
        lastName: formCreat.lastName.value,
        age: formCreat.age.value,
        email: formCreat.email.value,
        password: formCreat.password.value,
        roles: rolesNewUser,
    }

    fetch(urlAdmin, {
        method: 'POST',
        body: JSON.stringify(User),
        headers: {
            // Добавляем необходимые заголовки
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const formCreat = document.forms.formCreat
            formCreat.name.value = ''
            formCreat.lastName.value = ''
            formCreat.age.value = ''
            formCreat.email.value = ''
            formCreat.password.value = ''
            allUserTable()
            addOption('roleNew')
        })
}

//Событие обновления User
function updateUser() {
    const formEdit = document.forms.formEdit
    let rolesUser = []

    for (let i = 0; i < formEdit.rolesEdit.options.length; i++) {
        if (formEdit.rolesEdit.options[i].selected) {
            let role = {
                id: formEdit.rolesEdit.options[i].value,
                role: formEdit.rolesEdit.options[i].textContent
            }
            rolesUser.push(role)
        }
    }

    let User = {
        id: formEdit.idEdit.value,
        firstName: formEdit.nameEdit.value,
        lastName: formEdit.lastNameEdit.value,
        age: formEdit.ageEdit.value,
        email: formEdit.emailEdit.value,
        password: formEdit.passwordEdit.value,
        roles: rolesUser,
    }

    console.log(User)

    fetch(urlAdmin, {
        method: 'PUT',
        body: JSON.stringify(User),
        headers: {
            // Добавляем необходимые заголовки
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            allUserTable()
            $('#modalEdit').modal('hide')
        })
}

// Событие удаления User
function deleteUser() {
    const id = document.forms.formDelete.idDelete.value
    fetch(urlAdmin + id, {
        method: 'DELETE',
        headers: {
            // Добавляем необходимые заголовки
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
        })
        .then(() => {
            allUserTable()
            $('#modalDelete').modal('hide')
        })
}
