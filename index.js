const Xray = require("x-ray");
const x = Xray();

const download = require("download");

const URL = "http://urbangurucafe.com/";
const TOTAL_PAGES = 10;
const SAVE_PATH = "./mp3s";

let downloadURLs = [];
let podcastCount = 100;
for (let page = 1; page <= TOTAL_PAGES; page++) {
    const page_url = page === 1 ? URL : URL + "/page/" + page;

    x(page_url, "div#contents", ["h2 > a@href"])((err, hrefs) => {
        if (err) throw err;

        for (let href of hrefs) {
            x(href, {
                title: "h2 > a",
                mp3_url: "div.podPress_downloadlinks > input@value"
            })((perr, pcast) => {
                if (perr) throw perr;

                console.log(pcast);

                // // Get the filename from the url
                // const url_sections = mp3_url.split("/");
                // let filename = url_sections.pop();
                // const filename_sections = filename.split("-");

                // let possibleTitlePrefix = podcastCount.toString();
                // if (filename_sections[0] !== possibleTitlePrefix) {
                //     if (podcastCount < 10) {
                //         // Addd prefix 0 (for sorting)
                //         possibleTitlePrefix = "0" + possibleTitlePrefix;
                //     }
                //     filename = possibleTitlePrefix + "-" + filename;
                // }

                // const dl = { url: mp3_url, filename };
                // console.log(dl);
                // //downloadURLs.push(mp3_url);
                // podcastCount--;
            });
        }

        if (page === 10) {
            //downloadAll();
        }
    });
}

function downloadAll() {
    console.log("Downloading all...");
    Promise.all(
        downloadURLs.map(url => {
            console.log("Downloading: " + url);
            download(url, SAVE_PATH);
        })
    ).then(() => {
        console.log("Files downloaded into " + SAVE_PATH);
    });
}
