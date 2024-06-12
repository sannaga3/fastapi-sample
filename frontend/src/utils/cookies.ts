import dayjs from "dayjs";

export const setCookie = (name: string, token: string, hours: number) => {
  const expires = dayjs().add(hours, "hours");
  document.cookie = `${name}=${token}; expires=${expires}; path=/; secure; samesite=strict;`;
};

export const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const removeCookie = (name: string) => {
  return new Promise<void>((resolve) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
    resolve();
  });
};
