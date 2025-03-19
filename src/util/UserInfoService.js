
import StorageService from "@/util/StorageService";
// 定义一个UserInfoService类，用于获取、设置和删除用户信息
class UserInfoService {
  // 获取用户信息
  static get() {
    return StorageService.get("userInfo");
  }

  // 设置用户信息
  static set(userInfo) {
    StorageService.set("userInfo", userInfo);
  }

  // 删除用户信息
  static remove() {
    StorageService.remove("userInfo");
  }
}

export default UserInfoService;