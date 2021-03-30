const localOrigin =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://lsmurray.com";

export const isLocalUrl = (val: string): boolean =>
  new URL(val, localOrigin).origin === localOrigin;
