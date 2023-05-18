export const appConf: AppConf = {
  homePage: 'pages/demo/index',
  extendStores: [],
  // enterLogo:
  //   'https://static.weixiaotong.com.cn/static/icon/mini_program_platform/teacherButler/teacherButler.png',
  // enterLoading:
  //   'https://static.weixiaotong.com.cn/static/icon/mini_program_platform/assetManagement/out-logo-blue.svg',

  beforeOauthedHook() {
    return true
  },

  oauthedHook() {
    return true
  },
}
