export const Envs = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  app: {
    title: 'Video Conference',
    description:
      'A video conferencing site is a digital platform that enables real-time, face-to-face meetings between users in different locations.',
  },
  api: {
    url: 'http://localhost:3001',
  },
};
