/* eslint-disable no-unused-vars */

const faker = require('faker/locale/en_GB');
const db = {};

const users = [];
const todos = [];
const projects = [];
const chats = [];
const contacts = [];

// user Faker to create data
// create users
for (let i = 1; i <= 5; i++) {
    const fname = faker.name.firstName();
    const lname = faker.name.lastName();
    const user = {
        id: i,
        username: `user_${i}`,
        password: 'pwd12345',
        profile: {
            avatar: 'assets/images/avatars/profile.jpg',
            firstName: fname,
            lastName: lname,
            email: faker.internet.email(fname, lname).toLowerCase()
        }
    };
    users.push(user);

    // do projects
    const projectsCount = faker.random.number({ min: 1, max: 10 });
    for (let c = 1; c <= projectsCount; c++) {
        const project = {
            id: c,
            user_id: i,
            title: faker.lorem.words(3),
            description: faker.lorem.sentence()
        };
        projects.push(project);

        // do todos
        const todosCount = faker.random.number({ min: 5, max: 25 });
        for (let t = 1; t <= todosCount; t++) {
            const from = new Date(2018, 0, 1);
            const to = new Date();
            const todo = {
                id: t,
                user_id: i,
                project_id: c,
                title: faker.lorem.words(3),
                notes: faker.lorem.sentence(),
                startDate: faker.date.between(from, to)
            };
            todos.push(todo);
        }
    }
}

const chatCount = faker.random.number({ min: 5, max: 50 });
// do chats
for (let k = 1; k <= chatCount; k++) {
    const randomUser = faker.random.arrayElement(users);
    const chat = {
        id: k,
        user_id: randomUser.id,
        messages: {
            time: faker.date.between(new Date(2018, 0, 1), new Date(2018, 6, 1)),
            message: faker.lorem.sentences(2),
            from: faker.random.arrayElement(users.filter(u => u.id != randomUser.id)).id
        }
    };
    chats.push(chat);
}

db.users = users;
db.todos = todos;
db.projects = projects;
db.chats = chats;
db.contacts = contacts;


module.exports = () => db;