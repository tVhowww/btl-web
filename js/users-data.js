const users = [
    {
        id: 1,
        fName: "Nguyen Trung Hau",
        email: "hau123@gmail.com",
        phone: "0123456789",
        password: "hau123@@",
        dayOfBirth: "2004-09-05",
        gender: 1,
    },
    {
        id: 2,
        fName: "An Nguyen",
        email: "annguyen123@gmail.com",
        phone: "0123456789",
        password: "an123@@",
        dayOfBirth: "2004-10-09",
        gender: 1,
    },
    {
        id: 3,
        fName: "Bình Lê",
        email: "binhle123@gmail.com",
        phone: "0123456789",
        password: "binh123@@",
        dayOfBirth: "2004-09-10",
        gender: 1,
    },
    {
        id: 4,
        fName: "Cẩm Lê",
        email: "camle123@gmail.com",
        phone: "0123456789",
        password: "cam123@@",
        dayOfBirth: "2004-07-12",
        gender: 0,
    }
];
localStorage.setItem("users", JSON.stringify(users));

export default users;
