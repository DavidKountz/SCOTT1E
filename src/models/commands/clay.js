function runSelf(args) {
    // surrounds words with cl and ay, like cl__word__ay
    // will likely change this to be more entertaining, like mashing various words together
    args = args.replace("clay ", "");
    let splitsum = args.split(" ");
    let words = "";
    let output = "Your clay command is too short! Add more words to mash together!";

    if (splitsum.length >= 2) {
        for (let i = 0; i < splitsum.length; i++) {
            if (i === splitsum.length-1) {
                words += splitsum[i].substring(splitsum[i].length/2, splitsum[i].length);
                break;
            } else if (i === 0) {
                words += splitsum[i].substring(0, splitsum[i].length/2);
            }

            let currentWord = splitsum[i];
            let nextWord = splitsum[i+1];

            words += `${currentWord.substring(currentWord.length/2, currentWord.length) + nextWord.substring(0, nextWord.length/2)}`;

            words += " ";
        }
        output = words;
    }

    if (!args) {
        return "ERR_ARGS";
    }
    return output;
}

function runHelp() {
    return "Combines adjacent words in a fun way! You need more than one word for this to work." +
        "The end result is a bit like pig latin :D";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;