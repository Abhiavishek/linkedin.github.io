const loginLink = "https://www.linkedin.com";
const puppeteer = require("puppeteer");

//const codeFile = require("./code")
console.log("Before");
let page;

let email = "vudrohotro@vusra.com";
let password = "Vali09876";
let browserWillLaunchPromise = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});
browserWillLaunchPromise
  .then(function (BrowerInstance) {
    let newTabPromise = BrowerInstance.newPage();
    return newTabPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let websiteWillbeOpenedPromise = newTab.goto(loginLink);
    return websiteWillbeOpenedPromise;
  })
  .then(function () {
    let emailWillbeEnteredPromise = page.type('.input__input[id="session_key"]', email, {
      delay: 50,
    });
    return emailWillbeEnteredPromise;
    //console.log('Hacker rank opened')
  })
  .then(function () {
    let passwordWillbeEnteredPromise = page.type(
      '.input__input[id="session_password"]',
      password,
      { delay: 50 }
    );
    return passwordWillbeEnteredPromise;
    //console.log('Hacker rank opened')
  })
  .then(function () {
    let loginButtonclickedPromise = page.click(
      '.sign-in-form__submit-button',
      { delay: 50 }
    );
    return loginButtonclickedPromise;
  })
  .then(function () {
    let requestSecClickedPromise = waitAndClick(
      '.global-nav__primary-link.ember-view[id="ember19"]',
      page
    );
    return requestSecClickedPromise;
  })
  .then(function () {
    let acceptButtonclickedPromise = page.click(
      '.msg-overlay-bubble-header__details.flex-row.align-items-center.ml1',
      { delay: 50 }
    );
    return acceptButtonclickedPromise;
  })
  function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
      let waitForModalPromise = cPage.waitForSelector(selector);
      waitForModalPromise
        .then(function () {
          let clickModal = cPage.click(selector, { delay: 100 });
          return clickModal;
        })
        .then(function () {
          resolve();
        })
        .catch(function () {
          reject();
        });
    });
  }