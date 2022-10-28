module.exports = app => {

  let { validator } = app;

  // 校验用户名是否正确
  validator.addRule('userName', (rule, value) => {
    if (/^\d+$/.test(value)) {
      return "用户名应该是字符串";
    }
    else if (value.length < 2 || value.length > 20) {
      return "用户名的长度应该在2-20之间"
    }
  });

  // 校验手机号是否正确
  validator.addRule('phone', (rule, value) => {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      return "请输入合法手机号"
    }
  });

  // 校验密码是否正确
  validator.addRule('password', (rule, value) => {
    if (!/.{6,}$/.test(value)) {
      return "请输入6位及以上密码"
    }
  });
};