pipeline {
    agent any
    
    tools {
        nodejs 'node20' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' 
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    sh 'mkdir -p /var/www/blyator'
                    sh 'rm -rf /var/www/blyator/*'
                    sh 'cp -r dist/* /var/www/blyator/'
                    echo 'Deployment successful!'
                }
            }
        }
    }
}