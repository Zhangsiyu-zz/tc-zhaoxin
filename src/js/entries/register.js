//引入
import request from '../api/api.js';
//抓取页面元素
const form = document.getElementById('registerForm')
const studentIdInput = document.getElementById('studentId')
const nameInput = document.getElementById('name')
const majorInput = document.getElementById('major')
const phoneInput = document.getElementById('phone')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const captchaInput = document.getElementById('captcha')
const captchaImg = document.getElementById('captchaImage')
//验证码返回的时图片，不是JOSN,所以不用axios拿
function loadCaptcha() {
    //加时间戳是为了防止浏览器缓存
    captchaImg.src = '/api/captcha/generate?ts=' + Date.now()
}
loadCaptcha()
captchaImg.addEventListener('click', loadCaptcha)

//表单提交逻辑
if (form) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault()//组织默认刷新
        console.log('拦截到了提交，开始校验')

        //获取表单数据  trim() 去除空格
        const studentId = studentIdInput.value.trim()
        const name = nameInput.value.trim()
        const major = majorInput.value.trim()
        const phone = phoneInput.value.trim()
        const email = emailInput.value.trim()
        const password = passwordInput.value
        const captcha = captchaInput.value.trim()
        if (!studentId || !name || !major || !phone || !email || !password || !captcha) {
            alert('请填写所有必填项！')
            return
        }
        if (studentId.length !== 10) {
            alert('学号是10位哦！')
            return
        }
        if (phone.length !== 11) {
            alert('手机号是11位哦！')
            return
        }
        if (password.length < 6) {
            alert('密码必须大于等于6位！')
            return
        }

        // 提交表单
        const data = {
            studentId: studentId,
            name: name,
            password: password,
            major: major,
            phone: phone,
            email: email,
            captcha: captcha,
        }
        try {
            const res = await request.post('/student/register', data)
            if (res.code === 200) {
                alert('注册成功！')
                window.location.href = 'login.html'
            } else {
                alert(res.msg)
                loadCaptcha()
            }
        } catch (error) {
            console.log(error);
            alert('网络链接失败，请检查网络！')
            loadCaptcha()
        }
    })
}