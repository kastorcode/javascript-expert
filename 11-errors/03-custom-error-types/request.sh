echo $'\n\n[requesting: normal request]'
curl localhost:3000 -i -X POST --data '{"name":"Goku","age":"47"}'

echo $'\n\n[requesting: wrong age request]'
curl localhost:3000 -i -X POST --data '{"name":"Gohan","age":"18"}'

echo $'\n\n[requesting: wrong name request]'
curl localhost:3000 -i -X POST --data '{"name":"A","age":"25"}'

echo $'\n\n[requesting: connection error request]'
curl localhost:3000 -i -X POST --data '{"connectionError":"true"}'