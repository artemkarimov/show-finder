const getArrayUniqueByKey = <T>(array: T[], key: keyof T): T[] => {
  const arrayUniqueByKey = [...new Map(array.map(item => [item[key], item])).values()];
  return arrayUniqueByKey;
};

export default getArrayUniqueByKey;
