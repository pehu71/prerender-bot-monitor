let fs = require('fs');

let parseLog = (pat, short, logFile, human) => {

    let file = fs.readFileSync(logFile, 'utf-8');
    let split = file.split(/\n/g);
    let max = split.length;

    let cnt = 0;

    for (let i = 0; i < max; i++) {

        if (pat.test(split[i])) {
            let lineSplit = split[i].split(/ /g).filter(f => f !== '-' && f !== '"-"');
            let line = short ? '' : lineSplit[1] + lineSplit[2];
            line += ' ' + lineSplit[3] + ' ' + lineSplit[4] + ' ' + lineSplit[5];
            line += ' ' + lineSplit[6] + ' ' + lineSplit[7];
            console.log(line);
            cnt++;
        }
    }

    console.log(`Total Hits for ${human}: ${cnt}\r
`);
};

let printHelp = () => {
    console.log(`\nGeneral synatx:\nnode pac <log-file-name> [switches]\n`);
    console.log('List of possible switches:\n');
    console.log('-g filters for Googlebot Desktop');
    console.log('-gm filters for Googlebot Mobile');
    console.log('-gi filters for Googlebot Image');
    console.log('-gv filters for Googlebot Video');
    console.log('-s filters for SeznamBot');
    console.log('-b filters for bingbot');
    console.log('-h or --help prints this help');
    console.log('--short prints short version');
    console.log('');
};

let main = () => {

    const logFile = process.argv[2];

    let params = process.argv.filter(f => f === '-g'  || '-gm' || '-gi' || '-gv' || f === '-s' || f === '-b' || f === '-h');
    let options = process.argv.filter(f => f === '--help' || f === '--short');

    let short = false;

    for (let i = 0; i < options.length; i++) {
        switch (options[i]) {
            case '--help':
                printHelp();
                return;
            case '--short':
                short = true;
                break;
        }
    }

    if (params.length === 0) {
        printHelp();
        return;
    }

    for (let i = 0; i < params.length; i++) {
        switch (params[i]) {
            case '-h':
                printHelp();
                break;
            case '-g':
                parseLog(/Mozilla\/5\.0 \(compatible; Googlebot\/2\.1; \+http:\/\/www\.google\.com\/bot\.html\)/, short, logFile, 'Googlebot Desktop');
                break;
            case '-gm':
                parseLog(/Mozilla\/5\.0 \(Linux; Android 6\.0\.1; Nexus 5X Build\/MMB29P\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/41\.0\.2272\.96 Mobile Safari\/537\.36 \(compatible; Googlebot\/2\.1; \+http:\/\/www\.google\.com\/bot\.html\)/, short, logFile, 'Googlebot Mobile');
                break;
            case '-gi':
                parseLog(/Googlebot-Image\/1\.0/, short, logFile, 'Googlebot Image');
                break;
            case '-gv':
                parseLog(/Googlebot-Video\/1\.0/, short, logFile, 'Googlebot Video');
                break;
            case '-s':
                parseLog(/SeznamBot\/3\.2;/, short, logFile, 'SeznamBot');
                break;
            case '-b':
                parseLog(/bingbot/, short, logFile, 'bingbot');
                break;
        }
    }
};

main();