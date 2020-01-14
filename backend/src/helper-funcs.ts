export const stringifyMe = (data: any): string => {
  return JSON.stringify(data);
};

export const parseMe = (data: string): any => {
  return JSON.parse(data);
};
