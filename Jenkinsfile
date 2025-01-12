pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = credentials('GitHub_PAT') // Replace 'GitHub_PAT' with your actual GitHub credential ID
        MONGODB_CONNECTION = credentials('mongodb-connection')
        SLACK_CREDENTIALS = credentials('slack_webhook') // Replace 'slack_webhook' with your actual Slack credential ID
        GITHUB_REPO_URL = 'https://github.com/Xander-AJ/gallery_IP1'
        RENDER_DEPLOY_URL = credentials('render_deploy_hook') // Use the environment variable for the Render deploy hook
    }
    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Source Code Management') {
            steps {
                // Checkout the code from your Git repository.
                checkout([$class: 'GitSCM',
                    branches: [[name: 'master']],
                    userRemoteConfigs: [[url: env.GITHUB_REPO_URL, credentialsId: 'Xander-AJ']]
                ])
            }
        }

        stage('Install Node.js Dependencies') {
            steps {
                script {
                    // Verify the existence of a package.json file.
                    def packageJsonExists = fileExists('package.json')

                    if (packageJsonExists) {
                        // Install project dependencies with npm.
                        sh 'npm install'
                    } else {
                        error('package.json not found. This is not a Node.js project.')
                    }
                }
            }
        }

        stage('Tests') {
            steps {
                script {
                    // Run the "npm run test" command to test your project.
                    sh 'npm run test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy to Render using the specified Render deploy hook
                    sh "curl -sSf ${env.RENDER_DEPLOY_URL}"
                }
            }
        }
    }

    post {
        failure {
            // Send a Slack notification if any stage fails
            script {
                slackSend(
                    color: '#FF0000', // Customize the color of the notification
                    message: "Pipeline Failed: ${currentBuild.fullDisplayName}",
                    tokenCredentialId: '', // Leave this empty when using webhook
                    webhookUrl: env.SLACK_CREDENTIALS, // Use the environment variable for the Slack webhook
                    channel: '#gallery_ip1', // Your Slack channel name
                    teamDomain: 'T05T4NLEG4R' // Your Slack workspace ID
                )
            }
        }
    }
}
