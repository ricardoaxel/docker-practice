For deployment

To connect to instance:
ssh -i /Users/ashel/Documents/Programming/Fullstack/taskifyExtraFiles/taskify-ec2-key.pem ubuntu@44.202.243.182

To create images:

docker-compose build
docker-compose up
docker images
docker save -o taskify-backend.tar taskify-backend

To copy files to the ec2 instance
scp -i /Users/ashel/Documents/Programming/Fullstack/taskifyExtraFiles/taskify-ec2-key.pem taskify-backend.tar ubuntu@44.202.243.182:/home/ubuntu/
scp -i /Users/ashel/Documents/Programming/Fullstack/taskifyExtraFiles/taskify-ec2-key.pem taskify-frontend.tar ubuntu@44.202.243.182:/home/ubuntu/
