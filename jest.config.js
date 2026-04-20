module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./src/tests/setup.js'],
    reporters: [
        'default',
        [
            'jest-junit',
            { outputDirectory: 'ci-reports/junit', outputName: 'junit.xml' },
        ],
    ],
};
