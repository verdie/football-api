const { Router } = require('express');
const Team = require('./model');
const router = new Router()

router.get('/team', (request, response,next)=>{
    Team.findAll()
    .then(teams => {
        console.log('teams:', teams)
        response.send(teams)
    })
    .catch(console.error)
})
router.post('/team', (request, response,next)=>{
    console.log('REQUEST_BODY',request.body)
    Team
        .create({name: request.body.name})
        .then(team => response.send(team))
        .catch(next)
})
router.get('/team/:teamId', (request, response) => {
    console.log('PARAMS:',request.params.teamId)
    const teamId = request.params.teamId ;
    const team= Team.findByPk(teamId).then(team => response.send(team))
    console.log('TEAM:', team.dataValues)

    Team.findAll().then((team)=>{response.send(team.dataValues)})
    })

router.put('/team/:teamId',(request, response, next )=>{
    const teamId = request.params.teamId ;
    const team= Team
    .findByPk(teamId)
    .then(team => team.update(request.body))
    .then(team => {
        
            response.json(team);
        })
    .then(team => response.send(team))
    .catch(next)
})

// router.delete('/team/:teamId',(request, response, next )=>{
//     Team.destroy({
//         where: {
//             id: request.params.id
//           }
// })
//     .then(number => response.send({ number }))
//     .catch(next)
// })

router.delete(
    '/team/:id',
    (request, response, next) => {
      Team
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