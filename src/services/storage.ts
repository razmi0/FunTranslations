export const save = <T>(key: string, value: T) => {
  const localStorage = window.localStorage;
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
};

export const load = <T>(key: string): T | null => {
  const localStorage = window.localStorage;
  const json = localStorage.getItem(key);
  if (json == null) {
    return null;
  }
  return JSON.parse(json);
};
