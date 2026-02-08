type Value = string | null;

const mem = new Map<string, string>();

function hasLocalStorage() {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

const AsyncStorage = {
  async getItem(key: string): Promise<Value> {
    if (hasLocalStorage()) return window.localStorage.getItem(key);
    return mem.has(key) ? mem.get(key)! : null;
  },

  async setItem(key: string, value: string): Promise<void> {
    if (hasLocalStorage()) window.localStorage.setItem(key, value);
    else mem.set(key, value);
  },

  async removeItem(key: string): Promise<void> {
    if (hasLocalStorage()) window.localStorage.removeItem(key);
    else mem.delete(key);
  },
};

export default AsyncStorage;
