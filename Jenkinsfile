pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                echo 'Code cloned from GitHub'
            }
        }

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
                bat 'start cmd /k "npm start"'
            }
        }
    }
}