const bcrypt = require('bcrypt')

exports.hashPassword = async (password) => {
    const hashed = await bcrypt.hash(password, 13)
    return hashed
}

