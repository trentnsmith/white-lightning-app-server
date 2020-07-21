const SpiritsService = {
    getAllSpirits(db) {
        return db
            .select('*')
            .from('white_lightning_spirits');
    },

    createSpirit(db, spirit) {
        return db
            .insert(spirit)
            .into('white_lightning_spirits')
            .returning('*')
            .then((rows) => {
                return rows[0]
            });
    },

    getById(db, id) {
        return db
            .select('*')
            .from('white_lightning_spirits')
            .where('id', id)
            .first();
    },

    deleteSpirit(db, id) {
        return db
            .select('*')
            .from('white_lightning_spirits')
            .where('id', id)
            .delete();
    }
};

module.exports = SpiritsService;