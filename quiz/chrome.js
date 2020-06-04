var isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

if (isChrome == false) {
  alert(
    " You are not using Chrome browser. Please use Chrome browser for better experience"
  );
}
console.log(isChrome);
