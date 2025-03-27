import "@testing-library/jest-dom";
import "jest-environment-jsdom";
if (typeof structuredClone === "undefined") {
  global.structuredClone = (obj: any) => {
    if (obj === undefined || obj === null) {
      return obj;
    }
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      console.error("Error cloning object:", e);
      return obj; // Retorna o objeto original caso o clone falhe
    }
  };
}
