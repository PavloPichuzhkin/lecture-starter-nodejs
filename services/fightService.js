import {fightRepository} from "../repositories/fightRepository.js";

class FightersService {
    // OPTIONAL TODO: Implement methods to work with fights

    getAll() {
        try {
            return fightRepository.getAll();
        } catch (e) {
            console.log(e);
        }
    }

    getBy(repoKey) {
        try {
            return fightRepository.getOne(repoKey);
        } catch (e) {
            console.log(e);
        }
    }

    getById(id) {
        return this.getBy({id});
    }

    create(body) {
        try {
            return fightRepository.create(body);
        } catch (e) {
            console.log(e);
        }
    }

    update(id, body) {
        try {
            return fightRepository.update(id, body);
        } catch (e) {
            console.log(e);
        }
    }

    updateFight(id, log, res) {
        try {
            const fightToUpdate = this.getById(id);
            fightToUpdate.log.push(log)

            // console.log(fightToUpdate)

            return fightRepository.update(id, fightToUpdate);
        } catch (err) {
            console.log(err);
            res.badRequest = true;
            res.message = err.message;
        }
    }

    delete(id) {
        try {
            return fightRepository.delete(id);
        } catch (e) {
            console.log(e);
        }
    }

    search(search) {
        const item = fightRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
}

const fightersService = new FightersService();

export {fightersService};
