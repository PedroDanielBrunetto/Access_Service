interface IMailConfig {
  driver: string;
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: process.env.DEFAULT_FROM_EMAIL,
      name: process.env.DEFAULT_FROM_NAME,
    },
  },
} as IMailConfig;
