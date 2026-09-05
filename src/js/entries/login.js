import request from "../api/api.js";

const loginForm = document.getElementById("loginForm")
const studentId = document.getElementById("studentId")
const password = document.getElementById("password")
// 阻止默认刷新
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const studnetIdValue = studentId.value.trim()
    const passwordValue = password.value
    if (!studnetIdValue || !passwordValue) {
        alert('请填写所有必填项！')
        return
    }

    try {
        const data = {
            studentId: studnetIdValue,
            password: passwordValue
        }
        const res = await request.post('/student/login', data)
        if (res.code === 200) {
            // 把后端返回的 token 存起来，之后 api.js 的请求拦截器会自动带上它
            //  localStorage.setItem('token', res.data)
            alert('登录成功！')
            window.location.href = 'index.html'
        } else {
            alert(res.msg)

        }


    } catch (error) {
        console.log(error)
        alert('登录失败！')
    }


})

