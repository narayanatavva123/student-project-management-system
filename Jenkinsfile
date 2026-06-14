pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npm install -g pm2'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Build completed successfully'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'npx pm2 delete student-project || exit /b 0'
                bat 'npx pm2 start server.js --name student-project'
                bat 'npx pm2 save'
            }
        }
    }
}