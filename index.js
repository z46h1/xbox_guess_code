let arrayOfCodes = [
    'XX4Q6',
    'THFLM-K2JKP-4RR36-HWWXZ'
]
// let alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 65));
let numbers = [...Array(10).keys()].map(i => String.fromCharCode(i + 48));
// let charsArr = [...alphabet, ...numbers];

const changeQuestionMark = (arr) => arr.reduce((acc, code) => {
	if (!code.includes('?')) {
	  return acc.concat(code)
  } else {
	  return acc.concat(numbers.map(alphanumeric => code.replace('?', alphanumeric)))
  }
}, [])

const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
  }
let codes = changeQuestionMark(permutator(arrayOfCodes).map(arr => arr.join('-')));
console.log(changeQuestionMark(permutator(arrayOfCodes).map(arr => arr.join('-')).length))
let myCopy = copy;

// zmienic authorization
codes.forEach(code => {
  fetch(`https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=PL&language=en-US&supportMultiAvailabilities=true`, {
    headers: {
      'Authorization': 'WLID1.0="GABAAgMAAAAEgAAADAAg93A0K4/3QpldfaxH1uCq7njE2ex73KHIYRay23SSLhIAAb5+KNgtL8gjitZ0m7ANkMiVAdkcTZDevbdtHdunhGuyRyqobp5BW6/hOHclcfx2kR+LGsmy6w7np7u9M7lNOVkfd7wnJSI9rxzKeT/uivDq8P5CuSOCnBgDEvyOz137l12cD0CTnRuMlEYW4GVQttZc0jOCdAV+P7SeJk6Rt8xGlp2UhggaWMFhcqWZN5PnYt/xlICxvYxL3+FahunfrWBDEFj1vHUtcc9dHIQ/E/QfPsVu3QL8s9GPugMUilTtPl1XmSTuKbpQ+23KK2tiHvOMhrF3xtJVDdV+ITowcPNdo9mpQ0DCyo+T5l0PyAbqPKxI/CjD0bbVP8tFd1owKK8NAXsADQH9vwMA8y1HjqtV+l2rVfpdXyIBAAoQIIAQDgB6YWdoaTQzQG8yLnBsAFwAABp6YWdoaTQzJW8yLnBsQHBhc3Nwb3J0LmNvbQAAAE5QTAAGNjYtMjAwAJvgsAAAAgAAg6JtQDAGQQAGVG9tYXN6AAhaYWdvemRvbgUcAAAAAAAAAAAAAAAAAAAAAN2V8epvrtxSAACrVfpdrPxwXgAAAAAAAAAAAAAAAA0AODkuNjQuNTYuMjIzAAUBAAAAAAAAAAAAAAAAAQAAAAAAAAAAAADDabNXAAB6sSr7wfzdvgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP2/IwAl0kyEAAAAAAMA"',
      'content-type': 'application/json'
    }
  }).then(response => response.json())
    .then(response => {
    if (response && response.message && response.message === 'The requested resource could not be found.') {
      console.log(`CODE ${code} is incorrect or error`);
    } else if (response && response.tokenState && response.tokenState === 'Redeemed') {
      console.log(`CODE ${code} has been redeemed.`);
    } else {
      console.log(`%c CODE ${code} is probably good code!`, 'background: #fff; color: #000');
      myCopy(JSON.stringify(code));
    }
  })
})

// const fs = require('fs');

// fs.writeFile("text.txt", permutator(arrayOfCodes).map(arr => arr.join('-')), function(err) {

//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.goto('https://redeem.microsoft.com/', {
		waitUntil: 'networkidle2'
	});

  //LOGIN - enter email
  await page.waitForSelector("input[type=email]");
  await page.type("input[type=email]", 'zaghi43@o2.pl');
  await page.click('input[type=submit]');
 
  // LOGIN - enter password
  await page.waitForSelector("input[type=password]");
  await page.type("input[type=password]", 'cx4zc2sf4a1');
  await page.waitForSelector('input[value="Sign in"]');
  await page.click('input[value="Sign in"]');

  // ENTER KEY
  // document.querySelector('#nextButton')
  let disabledButton = true;
  let codes = changeQuestionMark(permutator(arrayOfCodes).map(arr => arr.join('-')));
  let i;
  
  await page.waitForSelector('iframe#wb_auto_blend_container');
  const frame = page.frames().find(frame => frame.name() === 'wb_auto_blend_container');
  await frame.waitForSelector('input#tokenString');
  // await page.on('console', msg => {
  //   for (let i = 0; i < msg.args.length; ++i)
  //     console.log(`${i}: ${msg.args[i]}`);
  // });
  await page.on('response', async (response) => {   
    if (response.url() === `https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${codes[i]}?market=PL&language=en-US&supportMultiAvailabilities=true` && response.request().method() === 'GET') {
      if (response.status() === 200) {
        const resBody = await response.json();
        if (resBody.tokenState && resBody.tokenState === 'Redeemed') {
          console.log(`CODE ${codes[i]} has been redeemed.`);
        } else {
          console.log(`CODE ${codes[i]} is probably good code!`);
        }
      } else if (response.status() === 404) {
        console.log(`CODE ${codes[i]} is incorrect or error`)
      } else {
        console.log('Something is wrong')
      }
  }  
  });

  for (i = 0; i < codes.length && disabledButton; i++){
    await frame.type("input#tokenString", codes[i]);
    
    await page.waitForResponse(response => response.url() === `https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${codes[i]}?market=PL&language=en-US&supportMultiAvailabilities=true`);
    
    await frame.waitForSelector('#webblendBusySpinner', {hidden: true})
    // await frame.evaluate((codes, i) => {
    //   const errorDiv = document.querySelector('div.redeem_code_error')
    //   const errorText = errorDiv.firstElementChild.innerText;
    //   if (!!errorDiv && errorText.includes('redeemed')) {
    //     console.log(`CODE ${codes[i]} has been redeemed.`);
    //   } else if (!!errorDiv && !errorText.includes('redeemed')) {
    //     console.log(`CODE ${codes[i]} is incorrect`)
    //   } else {
    //     console.log(`CODE ${codes[i]} is probably good code or error`)
    //   }
    // }, codes, i);
    disabledButton = await frame.evaluate(() => document.querySelector('button#nextButton').disabled);
    const codeInput = await frame.$('input#tokenString');
    await codeInput.click({clickCount: 3});
    await codeInput.press('Backspace');
    // await page.waitFor(Math.floor(Math.random() * 1000) + 250);
  }
  if (!disabledButton) {
    await frame.click('button#nextButton');
  }
  console.log('CODE IS:', codes[i]);

 

  // document.querySelector('input#tokenString')



  // await browser.close();
})();