const Session = require('./models/Session.Model');

const newSession = async (userId) => {
    try {
        const session = new Session({
            userId: userId,
        })

        await session.save();
        return session;
    } catch (error) {
        console.log(error);
    }
}

module.exports = newSession;