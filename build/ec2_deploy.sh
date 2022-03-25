while getopts a:s:v: flag
do
    case "${flag}" in
        a) AWS_ECR_ACCESS_KEY_ID=${OPTARG};;
        s) AWS_ECR_SECRET_ACCESS_KEY=${OPTARG};;
        v) IMAGE_TAG=${OPTARG};;
    esac
done

export AWS_ACCESS_KEY_ID=$AWS_ECR_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_ECR_SECRET_ACCESS_KEY
docker login -u AWS -p $(aws ecr get-login-password --region ca-central-1) 713619954535.dkr.ecr.ca-central-1.amazonaws.com
docker pull 713619954535.dkr.ecr.ca-central-1.amazonaws.com/covid-19-tracker-app:$IMAGE_TAG
docker-compose up --build -d
