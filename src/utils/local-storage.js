/**
 * 获取 localStorage
 * @param  {...any} args 
 */
export const getLocalStorage = (...args) => {
    const storage = {};
    args.forEach(arg => {
        storage[arg] = window.localStorage.getItem(arg) || null;
    });
    return storage;
};

/**
 * 存储 localStorage
 * @param  {...any} args 
 */
export const setLocalStorage = data => {
    debugger
    Object.keys(data).forEach(prop => {
        const el = data[prop];
        window.localStorage.setItem(prop, el);
    });
};

/**
 * 清除 localStorage
 * @param  {...any} args 
 */
export const removeLocalStorage = (...args) => {
    args.forEach(arg => {
        window.localStorage.removeItem(arg);
    });
};
