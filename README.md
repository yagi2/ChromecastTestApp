# Media Cast from Chrome Test App

## build debug container[memo] 
```bash
# create nginx docker image
$ docker build -t [imageName] .

# run docker image
$ docker run -v [Path/To/This/Directory]:/var/www/html --name [containerName] -p 8080:80 -d [imageName]

# let's casting
$ curl localhost:8080
```

