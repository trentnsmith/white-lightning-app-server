const SpiritsService = {
    getAllSpirits(db) {
        return db
            .select('*')
            .from('white_lightning_spirits');
    }
};

module.exports = SpiritsService;