BG_URL="https://images5.alphacoders.com/137/thumb-1920-1370955.png"
FG_URL="https://static.wikia.nocookie.net/naruto/images/d/df/Naruto_-_12_anos_%28Render%29.png/revision/latest?path-prefix=pt-br"
REQUEST_URL="http://localhost:3000/joinImages?bg=$BG_URL&fg=$FG_URL"

echo $REQUEST_URL

curl $REQUEST_URL

# autocannon --renderStatusCodes -c 500 $REQUEST_URL