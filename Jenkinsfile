pipeline{
    agent{
        label "docker"
    }
    environment{
        DOCKER_HUB_PASS = credentials('ITdockerhub')
        DOCKER_IMAGE = "itgadgetstory/trusted-by-ggs-fe"
        FILE_PATH = "/root/ggs/repairSystem"
        FILE_NAME = "trusted-by-ggs-fe"
    }
    stages{
        stage("Env Check"){
            steps{
                echo "===== stages : Env Check  ====="
                echo "Branch name : ${GIT_BRANCH}"
                sh "pwd"
            }
        }
        stage("Setup Dev Env"){
            when {
                branch 'develop'
            }
            steps{
                echo "=====  stages : Setup Dev Env  ====="
                script {
                    env.DOCKER_TAG = "latest"
                    env.ENV = "dev"
                }
                echo "Docker Tag : ${DOCKER_TAG}"
            }
        }
        stage("Setup Prod Env"){
            when {
                branch 'main'
            }
            steps{
                echo "=====  stages : Setup Prod Env  ====="
                script {
                    env.DOCKER_TAG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
                    env.ENV = "prod"
                }
                echo "Docker Tag : ${DOCKER_TAG}"
            }
        }
        stage("Check to go"){
            options {
                timeout(time: 1, unit: 'MINUTES') 
            }
            steps{
                input message: 'User input required!',ok: 'Release!'
            }
        }
        stage("Docker login"){
            when {
                anyOf { 
                    branch 'main'; 
                    branch 'develop';
                } 
            }
            steps{
                echo "===== stages : Docker login ====="
                sh "echo ${DOCKER_HUB_PASS} | docker login -u itgadgetstory --password-stdin"
            }
        }

        stage("build image & push"){
            when {
                anyOf { 
                    branch 'main'; 
                    branch 'develop';
                } 
            }
            steps{
                echo "===== stages : Build image & push ====="
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
            post{
                always{
                    sh "docker logout"
                }
                success{
                    sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
        stage("Deploy"){
            when {
                anyOf { 
                    branch 'main'; 
                    branch 'develop';
                } 
            }
            steps{
                withEnv(["FILE_PATH=${env.FILE_PATH}","FILE_NAME=${env.FILE_NAME}","IMAGE_VERSION=${env.DOCKER_TAG}"]){
                script {
                    if (env.ENV == "dev" ) {
                        echo "===== stages : Deploy Dev ====="
                        sh """
                            ssh -i /root/key/k-dev -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@10.104.6.123 -- \'kubectl delete -f ${FILE_PATH}/${FILE_NAME}.yaml && kubectl apply -f ${FILE_PATH}/${FILE_NAME}.yaml\'
                        """
                    } else if (env.ENV == "prod" ){
                        echo "===== stages : Deploy Prod ====="
                        sh """
                            ssh -i /root/key/k-prod -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@10.104.7.209 -- \'cp -fp ${FILE_PATH}/${FILE_NAME}.example.yaml ${FILE_PATH}/${FILE_NAME}.yaml && sed -e \'\\\'\'s|IMAGE_VERSION|${IMAGE_VERSION}|g\'\\\'\' -i ${FILE_PATH}/${FILE_NAME}.yaml && kubectl delete -f ${FILE_PATH}/${FILE_NAME}.yaml && kubectl apply -f ${FILE_PATH}/${FILE_NAME}.yaml\'
                        """
                    }
                }
                }
            }
            post{
                success{
                    echo "====  Deploy  executed successfully  ===="
                }
                failure{
                    echo "====  Deploy  execution failed  ===="
                }
            }
        }
    }
    post{
        always{
            echo "======== Clear Workspace ========"
            cleanWs ( 
                cleanWhenFailure: true, 
                cleanWhenUnstable: true, 
                cleanWhenSuccess: true,
                cleanWhenNotBuilt: false,
                notFailBuild: true,
                deleteDirs: true,
            )
        }
        success{
            echo "======== pipeline executed successfully ========"
        }
        failure{
            echo "======== pipeline execution failed ========"
        }
    }
}