// src/utils/getURLParams.js
export default url => {
  const paramString = url.includes('?') ? url.split('?')[1] : '';
  const params = {};
  const paramParts = paramString.split('&');
  paramParts.forEach(part => {
    const [key, value] = part.split('=');
    if (key) params[key] = value;
  });
  return params;
};
