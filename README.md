**Set .env on _DEV proyect folder**
```
DB_USER=user
DB_PASSWORD=password
DB_NAME=db
DB_HOST=db
DB_PORT=3306
JWT_SECRET=some_weird_and_long_secret_string
```

**From the root folder of the proyect Build the base image**
```
docker build -f _DEV/Dockerfile.base -t base-image .
```

**Execute base image**
```
docker run --rm base-image
```

**Execute compose**
```
docker compose -f _DEV/compose.BE.yaml -f _DEV/compose.FE.yaml -f _DEV/compose.DB.yaml up
```

**Access FE App**

[http://localhost:8000](http://localhost:8000)

**Access BE App**

[http://localhost:8001](http://localhost:8001)