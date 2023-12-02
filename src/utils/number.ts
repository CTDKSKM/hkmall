function uncomma(str: string) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

export { uncomma };
