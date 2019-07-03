const prefix = (PRODUCTION) ? 'personal-ledger' : '';
export function getPath(path) {
  return '/' + prefix + path;
}