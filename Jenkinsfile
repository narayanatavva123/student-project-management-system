pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Build completed successfully'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'pm2 delete student-project || exit /b 0'
                bat 'pm2 start server.js --name student-project'
                bat 'pm2 save'
            }
        }
    }
}