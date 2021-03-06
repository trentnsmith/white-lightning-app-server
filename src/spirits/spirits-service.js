const SpiritsService = {
    getAllSpirits(db) {
        return db ('white_lightning_spirits')
            .select('white_lightning_spirits.*', 'white_lightning_distilleries.distillery_name', 'white_lightning_distilleries.website', 'white_lightning_distilleries.description')
            .join('white_lightning_distilleries', 'white_lightning_spirits.distillery_id', '=', 'white_lightning_distilleries.id');
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
    },

    updateSpirit(db, id, updateFields) {
        return db
            .select('*')
            .from('white_lightning_spirits')
            .where('id', id)
            .update(updateFields);
    }
};

module.exports = SpiritsService;