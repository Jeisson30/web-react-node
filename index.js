import express  from 'express'

const app = express()

app.get('/api/addUser', (req, res) => res.send('Agregando usuario'))

app.put('/api/changeUser', (req, res) => res.send('Actualizando usuario'))

app.delete('/api/deleteUser', (req, res) => res.send('Eliminando usuario'))


app.listen(3000)

console.log('ejecuto port 3000');