import instance from "./config";

const URL = {
  login: "/user/login",
  register: "/user/info",
  userInfo: "/user/info",
  userProjects: "/user/projects",
  projectsBasic: "/user/projectsBasic",
  chartDetailInfo: "/user/chartDetailInfo",
  adminUsersInfo: "/admin/usersInfo",
} as const;

/** 用户登录 */
export const postUserLogin = (account: string, password: string) => {
  return instance.post(URL.login, { account, password });
};

/** 用户注册 */
export const postUserRegister = (account: string, name: string, password: string) => {
  return instance.post(URL.register, { account, name, password });
};

/** 获取当前用户信息 */
export const getUserInfo = (account: string) => {
  return instance.get(URL.userInfo, { params: { account } });
};

/** 更新当前用户信息 */
export const putUserInfo = (account: string, username: string, password?: string) => {
  return instance.put(URL.userInfo, { account, username, password });
};

/** 获取某账号下的项目列表 */
export const getUserProjects = (account: string) => {
  return instance.get(URL.userProjects, { params: { account } });
};

/** 新建一个项目 */
export const postUserProjects = (account: string, initInfo: Record<string, unknown>) => {
  return instance.post(URL.userProjects, { account, ...initInfo });
};

/** 删除一个项目 */
export const deleteUserProjects = (projectId: string, account: string) => {
  return instance.delete(URL.userProjects, { params: { projectId, account } });
};

/** 更新项目最后修改时间 */
export const putProjectLastModify = (projectId: string) => {
  return instance.put(URL.userProjects, { projectId });
};

/** 获取项目画布基础信息（宽高、缩放、背景色等） */
export const getUserProjectsBasic = (projectId: string) => {
  return instance.get(URL.projectsBasic, { params: { projectId } });
};

/** 更新项目画布基础信息 */
export const putUserProjectsBasic = (
  projectId: string,
  payload: {
    width: number;
    height: number;
    initZoom: number;
    bgColor: string;
    viewportColor: string;
  }
) => {
  return instance.put(URL.projectsBasic, { projectId, ...payload });
};

/** 新增一个图表详情 */
export const postUserChartDetailInfo = (
  projectId: string,
  chartId: string,
  chartDetail: unknown
) => {
  return instance.post(URL.chartDetailInfo, { projectId, chartId, chartDetail });
};

/** 删除一个图表详情 */
export const deleteUserChartDetailInfo = (projectId: string, chartId: string) => {
  return instance.delete(URL.chartDetailInfo, { params: { projectId, chartId } });
};

/** 获取项目下所有图表详情 */
export const getUserChartDetailInfo = (projectId: string) => {
  return instance.get(URL.chartDetailInfo, { params: { projectId } });
};

/** 更新一个图表详情 */
export const putUserChartDetailInfo = (
  projectId: string,
  chartId: string,
  chartDetail: unknown
) => {
  return instance.put(URL.chartDetailInfo, { projectId, chartId, chartDetail });
};

/** 管理员：拉取所有用户 */
export const getAllUsersInfo = () => {
  return instance.get(URL.adminUsersInfo);
};

/** 管理员：删除一个用户 */
export const deleteUserInfo = (account: string) => {
  return instance.delete(URL.adminUsersInfo, { params: { account } });
};

/** 管理员：调整用户权限 */
export const putUserAuth = (account: string, newAuth: number) => {
  return instance.put(URL.adminUsersInfo, { account, newAuth });
};
