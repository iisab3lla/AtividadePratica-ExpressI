import express, { response } from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

//POST

let listagemCarros = [];
let adicionarCarro = 1

app.post('/carros', (request,response) =>{
    const marca = request.body.marca
    const modelo = request.body.modelo
    const cor = request.body.cor
    const ano = Number(request.body.ano)
    const preco = Number(request.body.preco)

    if(!marca){
        response.status(400).send('Informe uma marca válida!')
    }
    if(!modelo){
        response.status(400).send('Informe um modelo válido!')
    }
    if(!cor){
        response.status(400).send('Informe uma cor válida!')
    }
    if(!ano){
        response.status(400).send('Informe um ano válido!')
    }
    if(!preco){
        response.status(400).send('Informe um preço válido!')
    }

    let informacoesCarros = {
        id: adicionarCarro,
        marca: marca,
        modelo: modelo,
        cor: cor,
        ano: ano,
        preco: preco
    }

    listagemCarros.push(informacoesCarros)

    adicionarCarro++

    response.status(201).send(`
      Carro adicionado com sucesso!
    `)
})

//GET

app.get('/carros',(request,response) =>{

    if(listagemCarros.length === 0){
        response.status(400).send('Nenhum carro cadastrado. Adicione um carro para obter informações!')
    }
    
    const dados = listagemCarros.map((carro)=>`ID: ${carro.id} | Modelo: ${carro.modelo}| Marca: ${carro.marca} | Ano: ${carro.ano} | Cor: ${carro.cor} | Preço: R$ ${carro.preco}`)

    response.status(200).send(dados)
})

// GET - FILTER
app.get('/filtro', (request, response) => {
    const marca = request.body.marca;
    
    if (!marca) {
        response.status(400).send('Forneça uma marca válida para filtrar!');
    }
    
    const carroFiltrado = listagemCarros.filter(carro => carro.marca === marca);

    if (listagemCarros.length === 0) {
        response.status(404).send('Nenhum carro cadastrado!');
    }
    if(carroFiltrado.length === 0){
        response.status(404).send('Nenhum carro com esta marca cadastrada!');
    }
    const dados = carroFiltrado.map((carro)=> `ID: ${carro.id} | Modelo: ${carro.modelo} | Cor: ${carro.cor} | Preço: ${carro.preco}`)

    response.status(200).json({success: true, data: dados})
});

   



app.listen(8080, () => console.log("Servidor iniciado")); 
