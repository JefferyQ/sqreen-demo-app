const Fs = require("fs");
const Path = require("path");
const sqlite3 = require("sqlite3");
const faker = require("faker");
const db = new sqlite3.Database(Path.join(__dirname, "./sqreen-shop-db"));

console.log("initializing db...");
const init = Fs.readFileSync(Path.join(__dirname, "./database.sql"), "utf-8");

const fakePosts = new Array(1000)
  .fill()
  .map(() => {
    return {
      title: faker.commerce.productName(),
      content: faker.random.words(20),
      price: faker.commerce.price()
    };
  })
  .map(
    ({ title, content, price }) =>
      ` INSERT INTO POSTS (TITLE, CONTENT, PRICE) VALUES ("${title}", "${content}", "${price}");`
  )
  .join("\r\n");

const fakeUsers = new Array(100)
  .fill()
  .map(() => {
    return {
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: faker.internet.password()
    };
  })
  .map(
    ({ email, username, password }) =>
      ` INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ("${username}", "${email}", "${password}");`
  )
  .join("\r\n");
db.exec(`${init}
${fakePosts}
${fakeUsers}`);
