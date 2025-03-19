import store from "store2";

class StorageService {
  static local = store.namespace("CAuth-front");
  static session = store.session.namespace("CAuth-front");

  // ✅ 设置数据（可选过期时间，单位：毫秒）
  static set(key, value, ttl = null, useSession = false) {
    const storage = useSession ? this.session : this.local;
    if (ttl) {
      const expiryTime = new Date().getTime() + ttl;
      storage.set(key, { value, expiry: expiryTime });
    } else {
      storage.set(key, value);
    }
  }

  // ✅ 获取数据（自动处理过期数据）
  static get(key, useSession = false) {
    const storage = useSession ? this.session : this.local;
    const data = storage.get(key);
    if (!data) return null;

    if (data.expiry) {
      if (new Date().getTime() > data.expiry) {
        storage.remove(key);
        return null;
      }
      return data.value;
    }
    return data;
  }

  // ✅ 删除数据
  static remove(key, useSession = false) {
    const storage = useSession ? this.session : this.local;
    storage.remove(key);
  }

  // ✅ 清空所有数据
  static clear(useSession = false) {
    const storage = useSession ? this.session : this.local;
    storage.clear();
  }

  // ✅ 检查是否存在
  static has(key, useSession = false) {
    return this.get(key, useSession) !== null;
  }
}

export default StorageService;