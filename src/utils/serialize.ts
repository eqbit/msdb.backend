export const serialize = (
  params: Record<string, string | string[]>
) =>
  Object.entries(params).map(([ key, value ]) =>
    `${key}=${
      Array.isArray(value)
        ? value.join(',')
        : value
    }`).join('&');
