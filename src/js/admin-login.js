// src/js/admin-login.js
import request from './api/api.js';

// 绑定登录按钮的点击事件
document.getElementById('loginBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('请输入账号和密码！');
        return;
    }

    try {
        const res = await request.post('/api/admin/login', {
            username: username,
            password: password
        });

        if (res.code === 200) {
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
            }
            window.location.href = 'admin-dashboard.html';
        }
    } catch (error) {
        // 错误已经在 api.js 里统一 alert 了
    }
});