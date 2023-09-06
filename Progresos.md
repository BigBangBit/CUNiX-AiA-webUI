# miercoles 6, setiembre 2023

## intento de usar SSL y HTTP v2 en la app

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```

add  to 

// nuxt.config.js
const fs = require('fs')
const path = require('path')

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-privkey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost-cert.pem'))
    }
  },
}
