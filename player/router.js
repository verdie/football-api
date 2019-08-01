const Player = require('./model');
const Team = require ('../team/model')
const { Router } = require('express');
const router = new Router()

router.get('/player', (request, response,next)=>{
    Player.findAll()
        .then(players => {
            console.log('PLAYERS:', players)
            response.send(players)
        })
        .catch(console.error)
})
router.post('/player', (request, response,next)=>{
    console.log('REQUEST_BODY',request.body)
    Player
        .create({name: request.body.name, number: request.body.number, teamId: request.body.teamId})
        .then(player => response.send(player))
        .catch(next)
})
router.get('/player/:id', (request, response) => {
    const playerId = request.params.id ;
    const player= Player
        .findByPk(playerId, { include: [Team] })
        .then(player => response.send(player))

    Player.findAll().then((player)=>{
        response.send(player.dataValues)
    })
})

router.put('/player/:id',(request, response, next )=>{
        const playerId = request.params.id ;
        const player= Player
            .findByPk(playerId, { include: [Team] })
            .then(player => player.update(request.body))
            .then(player => {
                    response.json(player);
                })
            .then(player => response.send(player))
            .catch(next)
})

router.delete(
    '/player/:id',
    (request, response, next) => {
      Player
        .destroy({
          where: {
            id: request.params.id
          }
        })
        .then(number => response.send({ number }))
        .catch(next)
    }
  )
module.exports = router

