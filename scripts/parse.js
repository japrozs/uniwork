const fs = require("fs");

const file = fs.readFileSync("./colleges.json", "utf-8");
const json = JSON.parse(file);

const obj = [];

json.entities.forEach((e) => {
    obj.push({ value: e.content.entity.url, label: e.content.entity.name });
});

fs.writeFileSync("colleges-parsed.json", JSON.stringify({ obj }), "utf-8");
