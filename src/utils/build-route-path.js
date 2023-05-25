export function buildRoutePath(path) {
  const routeParametresRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametresRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}