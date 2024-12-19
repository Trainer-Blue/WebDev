/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
inquirer
  .prompt([{
    message: "What is the URL you would like to turn into a QR code?",
    name: "url"}
  ])
  .then((answers) => {
    const url = answers.url;
    fs.writeFile('qr.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }
    );
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream('qr.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });
//ok