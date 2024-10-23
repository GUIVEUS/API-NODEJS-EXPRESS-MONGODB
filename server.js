import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

const users = []



/* 
1) Escolher o tipo de metódo http 
2) Endereço
ex: www.lojadoseuchico.com/ENDEREÇO

3) req = requisição
res = resposta
res.send significa que vai retornar o que está dentro do parênteses

4) app.listen vai ser onde vai ser ouvido essa resposta no caso na porta 3000
*/

app.post('/usuarios', async(req, res) => {

   await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
       
        }
    })

    
    res.status(201).json(req.body)

})

app.put('/usuarios/:id', async(req, res) => {

    await prisma.user.update({

        where: {
            id: req.params.id
        },

         data: {
             email: req.body.email,
             name: req.body.name,
             age: req.body.age
        
         }
     })

     res.status(201).json(req.body)
 
 })


app.get('/usuarios', async(req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
        where: {
            name:  req.query.name,
            email: req.query.email,
            age: req.query.age
        }
    })
    } else {
        users = await prisma.user.findMany()
    }

    

    res.status(200).json(users)
})


app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: { 
            id: req.params.id
        }
    })
    res.status(200).json({message:'Usuario deletado com sucesso'})
})

app.listen(3000)


/* CRIAR NOSSA API DE USUÁRIOS
- Criar um usuário
- Listar todos os usuários
- Editar um usuário
- Deletar um usuário
*/
