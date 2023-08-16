import inquirer from 'inquirer';
import qr from 'qr-image';
import fs, { writeFile } from 'fs';

inquirer
  .prompt([
    {
    message: "Type your URL", 
    name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr.png'));

    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log("Something else went wrong!");
    }
  });
