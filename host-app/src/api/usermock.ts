export interface MockUser {
  id: number;
  username: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: string;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomUsername(): string {
  const names = ['alice', 'bob', 'charlie', 'dave', 'eve', 'frank', 'grace'];
  return names[getRandomInt(0, names.length - 1)] + getRandomInt(100, 999);
}

function getRandomEmail(username: string): string {
  const domains = ['example.com', 'test.com', 'mail.com'];
  return `${username}@${domains[getRandomInt(0, domains.length - 1)]}`;
}

function getRandomDate(): string {
  const start = new Date(2020, 0, 1).getTime();
  const end = new Date().getTime();
  return new Date(getRandomInt(start, end)).toISOString();
}

const mockUser: MockUser = {
  id: getRandomInt(1, 1000),
  username: getRandomUsername(),
  email: '', // will be set below
  age: getRandomInt(18, 65),
  isActive: Math.random() > 0.5,
  createdAt: getRandomDate(),
};
mockUser.email = getRandomEmail(mockUser.username);

export async function getUser(): Promise<MockUser> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, getRandomInt(100, 500)));
  const stored = typeof window !== 'undefined' ? localStorage.getItem('mockUser') : null;
  if (stored) {
    try {
      return JSON.parse(stored) as MockUser;
    } catch {
      // fallback to new user if parse fails
    }
  }
  const username = getRandomUsername();
  const user: MockUser = {
    id: getRandomInt(1, 1000),
    username,
    email: getRandomEmail(username),
    age: getRandomInt(18, 65),
    isActive: Math.random() > 0.5,
    createdAt: getRandomDate(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUser', JSON.stringify(user));
  }
  return user;
}
