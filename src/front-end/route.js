const prefix = (PRODUCTION) ? 'personal-leger' : '';
export function getPath(path) {
  return prefix + path;
}