<!--  -->
<template>
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">达达外卖</h2>
          <div class="login_header_title">
            <a
              href="javascript:;"
              :class="{ on: loginWay }"
              @click="loginWay = true"
              >短信登录</a
            >
            <a
              href="javascript:;"
              :class="{ on: !loginWay }"
              @click="loginWay = false"
              >密码登录</a
            >
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{ on: loginWay }">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" />
                <button disabled="disabled" class="get_verification">
                  获取验证码
                </button>
              </section>
              <section class="login_verification">
                <input
                  type="tel"
                  maxlength="6"
                  placeholder="输入短信中的验证码"
                />
              </section>
              <section class="login_hint">
                温馨提示：未注册外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{ on: !loginWay }">
              <section>
                <section class="login_message">
                  <input
                    type="tel"
                    maxlength="11"
                    placeholder="手机/邮箱/用户名"
                    v-model="name"
                  />
                </section>
                <section class="login_verification">
                  <input
                    type="telt"
                    maxlength="12"
                    placeholder="输入6-12位密码"
                    v-model="pwd"
                    v-if="showPwd"
                  />
                  <input
                    type="password"
                    maxlength="12"
                    placeholder="输入6-12位密码"
                    v-model="pwd"
                    v-else
                  />
                  <div
                    class="switch_button"
                    :class="showPwd ? 'on' : 'off'"
                    @click="showPwd = !showPwd"
                  >
                    <div
                      class="switch_circle"
                      :class="{ right: showPwd }"
                    ></div>
                    <span class="switch_text">...</span>
                  </div>
                </section>
                <section class="login_message">
                  <input
                    type="rtel"
                    maxlength="4"
                    v-model="code"
                    placeholder="验证码"
                  />
                  <img
                    class="get_verification"
                    src="http://127.0.0.1:4000/captcha"
                    alt="captcha"
                  />
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-yixianshi"></i>
        </a>
      </div>
    </section>
    <!-- 调用警示框 -->
    <!-- 绑定自定义事件closeTip并且创建closeTip函数,函数隐藏提示框 -->
    <AlertTip
      :alertText="alertText"
      v-show="alertShow"
      @closeTip="closeTip"
    ></AlertTip>
  </div>
</template>

<script>
// 引入提示框组件
import AlertTip from '../../components/AlertTip/AlertTip.vue'
// 引入ajax请求方法
import { reqPwdLogin } from '../../api/index'
export default {
  data() {
    return {
      loginWay: true,       //true代表短信登录     false代表密码
      showPwd: false,       //on打开               off关闭
      pwd: "",              //双向绑定用户密码
      name: "",             //双向绑定用户输入用户名
      code: "",             //双向绑定用户输入密码
      alertText: "",         //提示框中显示文本
      alertShow: false,     //提示框是否显示控制变量
    };
  },

  components: { AlertTip },

  computed: {},

  methods: {
    // 点击确定关闭隐藏提示框组件    1.3解决提示框不统一
    closeTip() {
      this.alertShow = false;   //消除提示框组件
      this.alertText = "";      //消除提示文字
    },
    //显示提示框
    showAlert(alertText) {
      this.alertText = alertText; //将参数字符串赋值
      this.alertShow = true;      //显示框
    },
    //用户点击登录按钮,完成验证表单数据和后续操作
    async login() {
      //第一步:验证用户名输入:用户名,密码验证是否正确
      //1.1插件ain正则表达式用户名  字母数字下划线3~13位
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;   /** 验证用户名密码   由数字和字母组成要同时含有数字和字母，且长度要在6-14位之间*/
      let regcode = /^[0-9a-z]{4}$/i;
      //1.2:验证用户名如果不正确提示用户并且停止函数
      if (!reg.test(this.name)) {
        this.showAlert("密码格式不正确 密码由数字和字母组成,长度在6-14位之间")
        return;
      }
      if (!reg.test(this.pwd)) {
        this.showAlert("密码格式不正确 密码由数字和字母组成,长度在6-14位之间")
        return;
      }
      if (!regcode.test(this.code)) {
        this.showAlert("验证码格式不正确 验证码至少为4位")
        return;
      }
      //第二步:发送ajax请求完成用户登录{!!}核心
      const name = this.name;
      const pwd = this.pwd;
      const captcha = this.code;
      console.log(name, pwd, captcha);
      const result = await reqPwdLogin({ name, pwd, captcha });
      // 第三步:后去工作获取一个人信息保存vuex{?}
      if (result.code > 0) {
        //第四步:获取用户信息
        this.$store.dispatch("getUserInfo");
        //console.log(this.$store);
        //任务;登录成功跳转个人中心
        this.$router.replace("/profile");
      }
    }
  }
}


</script>
<style lang='stylus' rel='stylesheet/stylus'>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>