echo $'\n\n[requesting: normal request]'
curl localhost:3000 -i -X POST --data '{"name":"Goku","age":"47"}'

echo $'\n\n[requesting: invalid age request]'
curl localhost:3000 -i -X POST --data '{"name":"Gohan","age":"18"}'

echo $'\n\n[requesting: invalid name request]'
curl localhost:3000 -i -X POST --data '{"name":"A","age":"25"}'

echo $'\n\n[requesting: all invalid request]'
curl localhost:3000 -i -X POST --data '{"name":"B","age":"1"}'

echo $'\n\n[requesting: connection error request]'
curl localhost:3000 -i -X POST --data '{"connectionError":"true"}'