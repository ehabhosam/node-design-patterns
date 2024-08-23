# Define base image (we build on top of it)
# so, we don't care how node is packaged, we just need it
FROM node:14-alpine
# informs docker that app will be listening for TCP traffic on port 8080
EXPOSE 8080
# containers can't share files with host machine 
# so, we need to copy app files from host machine to container
# COPY <source> <destination>
# destination is /app/ folder inside container filesystem 
COPY app.js package.json /app/ 
# set working directory to /app/ folder
WORKDIR /app
# specify command to run to start the app when container starts
CMD ["node", "app.js"]
# OR CMD ["npm", "start"]

# build the image 
# docker build . -t <image_name>
# run the image 
# docker run -p 8080:8080 <image_name>

# where first port is host machine port and second port is container port

# naming convention for images: <image_name>:<version> 