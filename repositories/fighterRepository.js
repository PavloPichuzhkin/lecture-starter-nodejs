import {BaseRepository} from "./baseRepository.js";

class FighterRepository extends BaseRepository {
    constructor() {
        super("fighters");
    }

    getByName(search) {
        return this.dbContext.find((fighter) => {
            return fighter.name.toLowerCase() === search.name.toLowerCase()
        }).value()
    }
}

const fighterRepository = new FighterRepository();

export {fighterRepository};
