const{startBtn:t,stopBtn:e}={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let r=null;t.addEventListener("click",(()=>{t.setAttribute("disabled",""),r=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(()=>{clearInterval(r),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.530222cd.js.map