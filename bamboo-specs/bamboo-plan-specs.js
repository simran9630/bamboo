const plan = require('bamboo-specs').plan;

plan('My Node.js Project', {
    description: 'Build and test my Node.js project',
    stages: [
        {
            name: 'Build and Test',
            jobs: [
                {
                    key: 'BUILD',
                    tasks: [
                        {
                            script: {
                                inline: './npm install',
                            },
                        },
                        {
                            script: {
                                inline: './npm test',
                            },
                        },
                    ],
                },
            ],
        },
    ],
});
