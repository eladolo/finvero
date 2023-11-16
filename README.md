**Build base**
```
docker build -f Dockerfile -t base-image .
```

**Execute base image**
```
docker run --rm base-image
```

**Execute compose**
```
docker compose -f BE.yaml -f FE.yaml -f DBMigration.yaml up
```