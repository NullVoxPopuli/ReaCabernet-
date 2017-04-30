import naclUtil from 'tweetnacl-util';
// this package offers a ton of encoding / decoding options.
// We can probably slim this back down to UTF-*
import { TextDecoder } from 'text-encoding';

const defaultEncoding = 'utf-8';
const utf8Decoder = new TextDecoder(defaultEncoding);

export function convertUint8ArrayToBase64String(array) {
  return naclUtil.encodeBase64(array);
}

export function convertBase64StringToUint8Array(base64) {
  return naclUtil.decodeBase64(base64);
}

export function convertStringToUint8Array(string) {
  const base64 = btoa(string);
  return naclUtil.decodeBase64(base64);
}

export function convertUint8ArrayToString(array) {
  const string = utf8Decoder.decode(array);
  // string includes control characters, such as null
  // which is common if the string is shorter than a block
  const trimmed = string.replace(/^\0+/, '').replace(/\0+$/, '');

  return trimmed;
}

export function convertObjectToBase64String(object) {
  const json = JSON.stringify(object);
  const base64 = btoa(json);

  return base64;
}

export function convertBase64StringToObject(base64) {
  const json = atob(base64);
  const object = JSON.parse(json);

  return object;
}

export function objectToDataURL(object) {
  const string = convertObjectToBase64String(object);
  return `data:text/json;base64,${string}`;
}

// http://stackoverflow.com/a/39460727
export function base64ToHex(base64) {
  if (base64 === undefined) return undefined;

  // convert to binary, than to hex
  const raw = atob(base64);
  let hex = '';

  for (let i = 0; i < raw.length; i++) {
    const hexChar = raw.charCodeAt(i).toString(16);
    hex += (hexChar.length === 2 ? hexChar : `0${hexChar}`);
  }

  return hex.toUpperCase();
}
