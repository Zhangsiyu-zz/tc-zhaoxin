import request from "../api/api.js"

const loginForm = document.getElementById('loginForm')
const username = document.getElementById('username')
const password = document.getElementById('password')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const usernameValue = username.value.trim()
    const passwordValue = password.value
    if (!usernameValue || !passwordValue) {
        alert('请填写所有必填项！')
        return
    }
    try {
        const res = await request.post('/admin/login', {
            username: usernameValue,
            password: passwordValue
        })
        if (res.code === 200) {
            // 把后端返回的 token 存起来，之后 api.js 的请求拦截器会自动带上它
            localStorage.setItem('token', res.data)
            alert('登录成功！')
            window.location.href = 'admin-dashboard.html'
        } else {
            alert(res.msg)
        }
    } catch (error) {
        console.log(error)
        alert('登录失败！')
    }
})