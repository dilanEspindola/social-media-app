export const trimData = <T>(data: Record<string, string>): T => {
  const objTrimmed: Record<string, string> = {};
  for (const key in data) {
    objTrimmed[key] =
      typeof data[key] === "string" ? data[key].trim() : data[key];
  }
  return objTrimmed as T;
};
