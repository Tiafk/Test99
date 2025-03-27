const fs = require("fs");
const { faker } = require("@faker-js/faker");

const users = [];

for (let i = 0; i < 200; i++) {
  users.push({
    id: i + 1,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department(),
    company: faker.company.name(),
  });
}

fs.writeFileSync("./public/users.json", JSON.stringify({ users }, null, 2));

console.log("✅ 200 пользователей успешно сгенерированы!");

