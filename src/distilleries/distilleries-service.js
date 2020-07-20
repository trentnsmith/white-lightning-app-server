const DistilleryService = {
    getAllDistilleries(db) {
        return db
            .select('*')
            .from('white_lightning_distilleries');
    }
};

module.exports = DistilleryService;