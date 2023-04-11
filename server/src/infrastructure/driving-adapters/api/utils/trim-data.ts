export const trimData = (data: Record<string, string>) => {
  const objTrimmed: Record<string, string> = {};
  for (const key in data) {
    objTrimmed[key] =
      typeof data[key] === "string" ? data[key].trim() : data[key];
  }
  return objTrimmed;
};
