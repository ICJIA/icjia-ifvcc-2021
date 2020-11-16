if (isIE(window.navigator.userAgent))
  document.querySelector("#app").innerHTML = createBanner("ICJIA Intranet");
else require("./main");

function isIE(ua) {
  const isIE10orLess = ua.indexOf("MSIE") > -1;
  const isIE11 = ua.indexOf("Trident/") > -1;
  return isIE10orLess || isIE11;
}

function createBanner() {
  // const baseURL = process.env.BASE_URL;

  return `
  <div style="text-align: center; font-size: 0.7em;">
 
    
   

         <img src="/img/icjia-logo.png" width="175" style="margin-top: 50px; margin-bottom: 10px" alt="ICJIA logo" />

    <h1 style='font-family: Lato, sans-serif; margin-top: 40px; padding-top: 20px; padding-bottom:20px; background: #eee;'>
      The <span style="color: blue">Illinois Family Violence Coordinating Councils</span> site does not support Internet Explorer.
      <br><br>
      Please upgrade to a modern, secure browser such as
      <a href='https://www.google.com/chrome/'>Chrome</a>,
      <a href='https://www.mozilla.org/en-US/firefox/new/'>Firefox</a>, or
      <a href='https://www.microsoft.com/en-us/windows/microsoft-edge'>MS Edge</a>.
    </h1>
   
  </div>`;
}
