# PostgreSQL

docker run \
  --name postgres \
  -e POSTGRES_USER=kastorcode \
  -e POSTGRES_PASSWORD=12345 \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker logs postgres

docker exec -it postgres psql --username kastorcode --dbname heroes

CREATE TABLE warriors (id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);

SELECT * FROM warriors;

# MongoDB

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=kastorcode \
  -e MONGO_INITDB_ROOT_PASSWORD=12345 \
  -p 27017:27017 \
  -d \
  mongo:4

docker logs mongodb