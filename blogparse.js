
var fs = require("fs");
var text = fs.readFileSync("data.txt").toString();
var textByLine = text.split("\n");
const result = {};

textByLine.shift();
let firsIfFlag = true;
let elseIfFlag = true;

textByLine.forEach((line, index) => {
    if ((line.trim().length > 0)) {
        if ((line !== "---") && firsIfFlag) {
            line = String(line).replace(/"/g, "");
            let obj = line.split(":");
            if (obj[0] == "date") {
                result[obj[0]] = obj[1].trim() + ":" + obj[2].trim();
            } else if (obj[0] === "tags") {
                result[obj[0]] = obj[1].split(",").map(tag => tag.trim());
            } else if (obj[0] === "published") {
                result[obj[0]] = obj[1].trim() === "true" ? true : false;
            } else if ((obj[0] != "preview_image") && (obj[0] != "section")) {
                result[obj[0]] = obj[1].trim();
            }
        } else if ((line != "READMORE") && elseIfFlag) {
            firsIfFlag = false;
            line = String(line).replace(/"/g, "'");
            if (result["short-content"] != undefined) {
                let valOfShortContent = result["short-content"] + line.trim();
                result["short-content"] = valOfShortContent.trim();
            } else {
                result["short-content"] = "";
            }
        } else {
            elseIfFlag = false;
            line = String(line).replace(/"/g, "'");
            line = String(line).replace("CThe", "\tThe");
            if (result["content"] != undefined) {
                let valueOfContent = result["content"] + line.trim();
                result["content"] = valueOfContent.trim();
            } else {
                result["content"] = "";
            }
        }
    }
});
console.log("%j", result);
