const splitFileName = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) return { name: fileName, extension: "" };

  return {
    name: fileName.substring(0, lastDotIndex),
    extension: fileName.substring(lastDotIndex),
  };
};

const joinFileName = (name: string, extension: string) => {
  return `${name}${extension}`;
};

export { joinFileName, splitFileName };
