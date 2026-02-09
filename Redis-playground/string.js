const client = require("./client");

async function init() {
    //await client.set("user:4", "Ritamatika");
    await client.setex("user:5", 10, "Adrishkk");
    const ressult = await client.get("user:5");
    console.log("Result -->", ressult);
}

init();