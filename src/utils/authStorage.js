const USERS_KEY = "lumi_users";

const demoUsers = [
    { nome: "Maria", email: "demo@lumi.com", demo: true },
    { nome: "Tamires", email: "tamires@lumi.com", demo: true },
    { nome: "Alessandra", email: "alessandra@lumi.com", demo: true },
    { nome: "Gabrielly", email: "gabrielly@lumi.com", demo: true },
    { nome: "Lara", email: "lara@lumi.com", demo: true },
];

export function getUsers() {
    const storedUsers = localStorage.getItem(USERS_KEY);

    if (!storedUsers) {
        localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
        return demoUsers;
    }

    return JSON.parse(storedUsers);
}

export function authenticateUser(email, senha) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find((item) => item.email === normalizedEmail);

    if (!user) {
        return null;
    }

    if (!user.demo && user.senha !== senha) {
        return null;
    }

    return {
        nome: user.nome,
        email: user.email,
        token: `fake-token-${Date.now()}`,
    };
}

export function createUser({ nome, email, senha }) {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const userExists = users.some((user) => user.email === normalizedEmail);

    if (userExists) {
        return null;
    }

    const newUser = {
        nome: nome.trim(),
        email: normalizedEmail,
        senha,
        demo: false,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    return {
        nome: newUser.nome,
        email: newUser.email,
        token: `fake-token-${Date.now()}`,
    };
}
