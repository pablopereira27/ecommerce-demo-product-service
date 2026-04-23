module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.js'],
    reporters: [
        'default',
        [
            'jest-junit',
            { outputDirectory: 'ci-reports/junit', outputName: 'junit.xml' },
        ],
    ],
};
