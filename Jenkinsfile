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

                    sh 'rm -rf /var/jenkins_home/deploy_target/dist/*'
                    
                    sh 'cp -r dist/* /var/jenkins_home/deploy_target/dist/'
                    
                    echo 'Deployment successful!'
                }
            }
        }
    }
}
