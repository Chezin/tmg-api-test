
# TMG API Test

## API

### POST /lifo/add
Expects
`{
"element": "string"
}`

### GET /lifo/

### POST /keyvalue/add
Expects
`{
  "key": "string",
  "value": "string",
  "ttl?": 30000
}
`
with `ttl` being a number and optional 

### GET /keyvalue/:key
### DELETE /keyvalue/:key
