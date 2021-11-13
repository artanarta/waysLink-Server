const { user} = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        let data = await user.findAll({
            attributes: {
                exclude: ['password','createdAt', 'updatedAt']
            }
        })
    
        res.send({
            status: 'success',
            data: {
                users : data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getIdUsers = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await user.findOne({
            where: { id },
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          });
    
        res.send({
            status: 'success',
            data: {
                user : data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        let data = req.body

        data = {
          ...data,
      }

        await user.update(data,  {
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Update user id: ${id} finished`,
            data: {
                user : data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Delete user id: ${id} finished`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}



