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
                bat '''
                taskkill /F /IM node.exe
                exit /b 0
                '''
                bat 'start cmd /k "node server.js"'
            }
        }
    }
}