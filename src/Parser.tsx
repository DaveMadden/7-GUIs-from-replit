import React, { useState } from 'react';
// import uaParser from './ua-parser';
import {UAParser} from 'ua-parser-js'
// import UAParser from './ua-parser.js'


function Parser() {

  const parser = new (UAParser as any)(window.navigator.userAgent);
  const browser = parser.getBrowser();
  const device = parser.getResult();

  console.log(browser)
  console.dir(device)


  return (
    <div className="thing">
      {browser.name + " v." + browser.version}
    </div>
  )
}

export default Parser;