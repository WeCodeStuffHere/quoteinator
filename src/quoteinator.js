import Jimp from "jimp";
import fs from "fs";
import path from "path";
import { dirname } from "path";

class Quoteinator {
  constructor() {
    this.imagesDir = "images";
    this.images = fs
      .readdirSync(this.imagesDir)
      .map((i) => path.join(this.imagesDir, i));
  }

  quote(quote) {
    const fileName =
      this.images[Math.floor(Math.random() * this.images.length)];
    var loadedImage;

    console.log(fileName);
    Jimp.read(fileName)
      .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
      })
      .then(function (font) {
        loadedImage.print(font, 10, 50, quote).write(fileName);
      })
      .catch(function (err) {
        console.error(err);
      });

    return fileName;
  }
}

export default Quoteinator;
