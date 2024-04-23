const users = [
    {
        id: 1,
        name: "Nguyen Trung Hau",
        email: "haulaptrinh@gmail.com",
        phone: "0123456789",
        password: "123",
        dayOfBirth: "2222-12-12",
        gender: 1,
    },
    {
        id: 2,
        name: "hau hau",
        email: "nguyentrunghau111@gmail.com",
        phone: "0123456789",
        password: "Hau",
        dayOfBirth: "2004-05-09",
        gender: 0,
    },
    {
        id: 3,
        name: "Hau",
        email: "nguyentrunghau222@gmail.com",
        phone: "0123456789",
        password: "Hau123",
        dayOfBirth: "2004-09-05",
        gender: 0,
    },
    {
        id: 4,
        name: "Hau",
        email: "nguyentrunghau333@gmail.com",
        phone: "0123456789",
        password: "Hau",
        dayOfBirth: "2004-05-09",
        gender: 0,
    },
];
localStorage.setItem("users", JSON.stringify(users));

export default users;