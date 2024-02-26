import { Server } from 'azle';
import express, { Request } from 'express';

type bduser = {
    name: string
    bDate: string
    hobby: string
}

let bdusers: bduser[] = [{
    name: 'Jacob',
    bDate: '24-11-2004',
    hobby: 'Videogames'
}]

export default Server(() => {
    const app = express();

    app.use(express.json());

    //GET
    app.get('/bdusers', (req: Request, res) => {
        res.json(bdusers)
    })
    app.get('/bduser/:name', (req, res) => {
        const name = req.params.name
        console.log(name)
        const bduser = bdusers.find((bduser) => bduser.name === name)
        res.send(bduser)
    })    
        
    //POST
    app.post('/bdusers', (req, res) => {
        bdusers = [...bdusers, req.body]
        res.send("Ok")
    })
    //PUT
    app.put('/bdusers/:name', (req, res) => {
        const name = req.params.name
        const bduser = bdusers.find((bduser) => bduser.name === name)

        if (!bduser) {
            res.status(404).send('Not found')
            return
        }

        const updatedBduser = { ...bduser, ...req.body }
        bdusers = bdusers.map((b) => b.name === updatedBduser.name ? updatedBduser : b)
        res.send("Ok")
    })
    //DELETE


    return app.listen();
});
