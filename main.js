(() => {
  const init = () => {
    buildHTML();
    buildCSS();
    setEvents();
  };

  const buildHTML = () => {
    const html = `
            <div class="cs-container">
                <h1>aljfbpakhfkşasnfşksanf</h1>
            </div>
        `;

    document.querySelector(".Section1").insertAdjacentHTML("beforeend", html);
  };

  const buildCSS = () => {
    console.log("geldim");
    const css = `
            .cs-container {
                background-color: red;
                height: 200px;
            }
        `;

    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
  };

  const setEvents = () => {};

  init();
})();
