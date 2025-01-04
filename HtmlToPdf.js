const puppeteer = require("puppeteer");

(async () => {
    const myArgs = process.argv.slice(2);
    const inputHtmlFile = myArgs[0]
    const outputHtmlFileName = inputHtmlFile.replace(/\.[^/.]+$/, "") + '.pdf'
    const filePath = 'file:///' + __dirname + '/' + inputHtmlFile

    // Launch the headless browser
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });;
    const page = await browser.newPage();
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await page.pdf({
        path: outputHtmlFileName,
        printBackground: true,
        format: 'A4',
        margin: {
            left: "40px",
            right: "40px",
        }
    });
    await browser.close();
})();
