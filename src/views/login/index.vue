<script setup lang="ts">
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { bg, avatar, illustration } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import {
  ref,
  reactive,
  toRaw,
  onMounted,
  onBeforeUnmount,
  watch,
  onBeforeMount
} from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import { LoginByPasswordDTO } from "@/api/system/login/type";
import {
  getIsRememberMe,
  getPassword,
  removePassword,
  saveIsRememberMe,
  savePassword,
  setTokenFromBackend
} from "@/utils/auth";
import { getCaptchaCode, loginByPassword, getConfig } from "@/api/system/login";
import { rsaEncrypt } from "@/utils/crypt";
import { operates, thirdParty } from "./utils/enums";
import phone from "./components/phone.vue";
import TypeIt from "@/components/ReTypeit";
import qrCode from "./components/qrCode.vue";
import register from "./components/register.vue";
import resetPassword from "./components/resetPassword.vue";
defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

// AG区域
// TODO 当请求验证码过于频繁的话  服务器会报错  但是前端没有反应 这块需要处理一下, 通过axios处理一下
const captchaCodeBase64 = ref("");
const isCaptchaOn = ref(false); // 是否开启验证码，后端返回来决定修改
const isRememberMe = ref(false);
// 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
const currentPage = ref(0);
// AG区域

const { initStorage } = useLayout(); // 初始化存储
initStorage();
const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange(); // 主题
dataThemeChange(overallStyle.value);

const { title } = useNav();

const ruleForm = reactive<LoginByPasswordDTO>({
  //AG的
  username: "admin",
  password: "123456",
  captchaCode: "",
  captchaCodeKey: ""
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    getCaptchaCodeInLogin();
    if (valid) {
      loginByPassword({
        username: ruleForm.username,
        password: rsaEncrypt(ruleForm.password),
        captchaCode: ruleForm.captchaCode,
        captchaCodeKey: ruleForm.captchaCodeKey
      })
        .then(responseData => {
          if (responseData.code !== 200) {
            message(responseData.msg, { type: "error" });
            loading.value = false;
            return;
          }
          const data = responseData.data;
          console.log("登录成功后的数据", data);

          // 登录成功后 将token存储到sessionStorage中
          setTokenFromBackend(data);
          // 获取后端路由
          initRouter().then(() => {
            router.push(getTopMenu(true).path);
            // router.push("/welcome");
            loading.value = false;
            message("登录成功", { type: "success" });
          });
          if (isRememberMe.value) {
            savePassword(ruleForm.password);
          }
        })
        .catch(() => {
          loading.value = false;
          //如果登陆失败则重新获取验证码
        });
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}
async function getCaptchaCodeInLogin() {
  if (isCaptchaOn.value) {
    await getCaptchaCode().then(res => {
      captchaCodeBase64.value = `data:image/gif;base64,${res.data.captchaCodeImg}`;
      ruleForm.captchaCodeKey = res.data.captchaCodeKey;
    });
  }
}

watch(isRememberMe, newVal => {
  saveIsRememberMe(newVal);
  if (newVal === false) {
    removePassword();
  }
});

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});
onBeforeMount(async () => {
  await getConfig().then(res => {
    isCaptchaOn.value = res.data.isCaptchaOn;
    useUserStoreHook().SET_DICTIONARY(res.data.dictionary);
  });
  console.log("获取验证码");
  await getCaptchaCodeInLogin();
  console.log("输出验证码", captchaCodeBase64.value);

  isRememberMe.value = getIsRememberMe();
  if (isRememberMe.value) {
    console.log("isRememberMe", isRememberMe.value);
    ruleForm.password = getPassword();
  }
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="absolute flex-c right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        inline-prompt
        @change="dataThemeChange"
      />
    </div>
    <div class="login-container">
      <div class="img">
        <!-- 登录页面的背景图 -->
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <!-- 登录窗口上面的LOGO -->
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">
              <TypeIt :cursor="false" :speed="150" :values="[title]" />
            </h2>
          </Motion>

          <el-form
            v-if="currentPage === 0"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                  }
                ]"
                prop="username"
              >
                <el-input
                  v-model="ruleForm.username"
                  :prefix-icon="useRenderIcon(User)"
                  clearable
                  placeholder="账号"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  :prefix-icon="useRenderIcon(Lock)"
                  clearable
                  placeholder="密码"
                  show-password
                />
              </el-form-item>
            </Motion>

            <Motion :delay="200">
              <el-form-item v-if="isCaptchaOn" prop="captchaCode">
                <el-input
                  v-model="ruleForm.captchaCode"
                  :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
                  clearable
                  placeholder="验证码"
                >
                  <template v-slot:append>
                    <el-image
                      :src="captchaCodeBase64"
                      style="
                        justify-content: center;
                        width: 120px;
                        height: 40px;
                      "
                      @click="getCaptchaCodeInLogin"
                    >
                      <template #error>
                        <span>Loading</span>
                      </template>
                    </el-image>
                  </template>
                </el-input>
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-checkbox v-model="isRememberMe"> 记住密码</el-checkbox>
                  <el-button link type="primary" @click="currentPage = 4">
                    忘记密码
                  </el-button>
                </div>
                <el-button
                  :loading="loading"
                  class="w-full mt-4"
                  size="default"
                  type="primary"
                  @click="onLogin(ruleFormRef)"
                >
                  登录
                </el-button>
              </el-form-item>
            </Motion>

            <Motion :delay="300">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-button
                    v-for="(item, index) in operates"
                    :key="index"
                    class="w-full mt-4"
                    size="default"
                    @click="currentPage = item.page"
                  >
                    {{ item.title }}
                  </el-button>
                </div>
              </el-form-item>
            </Motion>
          </el-form>

          <Motion v-if="currentPage === 0" :delay="350">
            <el-form-item>
              <el-divider>
                <p class="text-xs text-gray-500">{{ "第三方登录" }}</p>
              </el-divider>
              <div class="flex w-full justify-evenly">
                <span
                  v-for="(item, index) in thirdParty"
                  :key="index"
                  :title="item.title"
                >
                  <IconifyIconOnline
                    :icon="`ri:${item.icon}-fill`"
                    class="text-gray-500 cursor-pointer hover:text-blue-400"
                    width="20"
                  />
                </span>
              </div>
            </el-form-item>
          </Motion>
          <!-- 手机号登录 -->
          <phone v-if="currentPage === 1" v-model:current-page="currentPage" />
          <!-- 二维码登录 -->
          <qrCode v-if="currentPage === 2" v-model:current-page="currentPage" />
          <!-- 注册 -->
          <register
            v-if="currentPage === 3"
            v-model:current-page="currentPage"
          />
          <!-- 忘记密码 -->
          <resetPassword
            v-if="currentPage === 4"
            v-model:current-page="currentPage"
          />
        </div>
      </div>
    </div>
    <!--  底部  -->
    <div class="flex items-center justify-center h-full">
      <div class="flex flex-col items-center justify-center mb-3">
        <span>Copyright © 2018-2023 Agileboot All Rights Reserved. </span>
        <el-link
          href="https://beian.miit.gov.cn"
          rel="external nofollow"
          target="_blank"
          type="primary"
          >闽ICP备2022018106号-2
        </el-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
