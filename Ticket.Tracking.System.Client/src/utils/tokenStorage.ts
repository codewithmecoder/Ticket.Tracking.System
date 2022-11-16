export const setItem = (key: string, value: string) => {
  if (window) {
    localStorage.setItem(key, value);
  }
};

export const removeItem = (key: string) => {
  if (window) {
    localStorage.removeItem(key);
  }
};

export const getItem = (key: string): string | null => {
  if (window) {
    return localStorage.getItem(key);
  }
  return null;
};

export const isAdmin = (roles: string[] | undefined): boolean => {
  if (roles) {
    const admin = roles.filter((i) => i === 'Admin')[0];
    if (admin) return true;
  }
  return false;
};
