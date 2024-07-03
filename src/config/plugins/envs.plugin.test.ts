import { envs } from "./envs.plugin";



describe('Pruebas en envs.plugin', () => {

    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'alejandro96121@gmail.com',
            MAILER_SECRET_KEY: 'ceglcqzrnumjytln',
            MONGO_URL: 'mongodb://alejandro:123456@localhost:27018',
            MONGO_USER: 'alejandro',
            MONGO_PASS: '123456',
            MONGO_DB_NAME: 'NOC-test'
        });
    });
});  