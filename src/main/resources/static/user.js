const url = 'http://localhost:8080/user/api'
const userInfo = document.getElementById('userInfo')
const tBodyUserInfo = document.getElementById('tbodyUserInfo')
const userInfoRole = document.getElementById('userInfoRole')


fetch(url)
    .then(response => response.json())
    .then(result => {
        userInfo.textContent = result.username
        let rolesInfoUser = ''

        for (let i = 0; i < result.roles.length; i++) {
            rolesInfoUser += `${result.roles[i].role} `
        }
        userInfoRole.textContent = rolesInfoUser
        tBodyUserInfo.innerHTML = `<tr>
        <td class="align-middle"> ${result.id} </td>
        <td class="align-middle"> ${result.firstName} </td>
        <td class="align-middle"> ${result.lastName} </td>
        <td class="align-middle"> ${result.age} </td>
        <td class="align-middle"> ${result.email} </td>
        <td class="align-middle"> ${rolesInfoUser} </td>
        </tr>
        `
    });