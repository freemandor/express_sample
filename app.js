const express = require('express')
const { promisify } = require('util')
const sleep = promisify(setTimeout)
const app = express()

app.use(express.json())
const port = 3000

app.get('/fast_user/:id', (req, res) => {
    if (req.get('token') !== 'awesomeNameBruh') {
        res.sendStatus(403)
        return
    }
    switch (req.params.id){
        case '1':
            res.json({
                firstName: 'Dor',
                lastName: 'Yaron'
            })
            break
        case '2':
            res.json({
                firstName: 'Mirit',
                lastName: 'Yaron'
            })
            break
        case '3':
            res.json({
                firstName: 'Ariel',
                lastName: 'Yaron'
            })
            break
        default:
            res.sendStatus(404)
    }
})

app.get('/slow_user/:id', (req, res) => {
    if (req.get('token') !== 'awesomeNameBruh') {
        res.sendStatus(403)
        return
    }
    sleep(3000).then(
        ()=> {
            switch (req.params.id){
                case '1':
                    res.json({
                        firstName: 'Dor',
                        lastName: 'Yaron'
                    })
                    break
                case '2':
                    res.json({
                        firstName: 'Mirit',
                        lastName: 'Yaron'
                    })
                    break
                case '3':
                    res.json({
                        firstName: 'Ariel',
                        lastName: 'Yaron'
                    })
                    break
                default:
                    res.sendStatus(404)
            }
        }
    )

})

app.post('/login', function (req, res) {
    console.log(req.body)
    if ((req.body.user === 'dor' && req.body.password === 'yaron') ||
        (req.body.user === 'fast' && req.body.password === 'user') ||
        (req.body.user === 'slow' && req.body.password === 'user'))
    {
        console.log('passed')
        res.status(200).json({token: 'awesomeNameBruh'})
    } else {
        res.status(401).send('youShallNotPass!!!')
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

