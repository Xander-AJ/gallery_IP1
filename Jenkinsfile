pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = credentials('GitHub_PAT') // Replace 'GitHub_PAT' with your actual GitHub credential ID
        MONGODB_CONNECTION = credentials('mongodb-connection')
        SLACK_CREDENTIALS = credentials('slack_webhook') // Replace 'slack_webhook' with your actual Slack credential ID
        GITHUB_REPO_URL = 'https://github.com/Xander-AJ/gallery_IP1'
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

        stage('Build and Tests') {
            steps {
                script {
                    // Verify the existence of a package.json file.
                    def packageJsonExists = fileExists('package.json')

                    if (packageJsonExists) {
                        // Install project dependencies with npm.
                        sh 'npm install'
                        
                        // Run the "npm run build" command to build your project.
                        sh 'npm run build'
                    } else {
                        error('package.json not found. This is not a Node.js project.')
                    }
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
