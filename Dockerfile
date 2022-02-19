# Uses the node base image with the latest LTS version
FROM node:17.5.0
# Informs Docker that the container listens on the 
# specified network ports at runtime
EXPOSE 4000
# Setup env variables
# ENV NODE_ENV production
ENV DATABASE_URL "mysql://user:password@ip:3306/dtbname?schema=public"
# Copies index.js and the two package files from the local 
# directory to a new app directory on the container
COPY index.ts package.json package-lock.json schema.graphql tsconfig.json .env ./
COPY src/ ./src/
COPY prisma/ ./prisma/
# Changes working directory to the new directory just created
WORKDIR /
# Installs npm dependencies on container
RUN npm ci
# Command container will actually run when called
CMD ["npm", "run", "run"]