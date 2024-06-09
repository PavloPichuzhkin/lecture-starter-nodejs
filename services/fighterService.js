import {fighterRepository} from "../repositories/fighterRepository.js";

class FighterService {

    getAll() {
        try {
            return fighterRepository.getAll();
        } catch (e) {
            console.log(e);
        }
    }

    getBy(repoKey) {
        try {
            if (Object.keys(repoKey)[0] === "name") {
                return fighterRepository.getByName(repoKey);
            }
            return fighterRepository.getOne(repoKey);
        } catch (e) {
            console.log(e);
        }
    }

    getById(id) {
        return this.getBy({id});
    }

    create(body) {
        try {
            return fighterRepository.create(body);
        } catch (e) {
            console.log(e);
        }
    }

    update(id, body) {
        try {
            return fighterRepository.update(id, body);
        } catch (e) {
            console.log(e);
        }
    }

    delete(id) {
        try {
            return fighterRepository.delete(id);
        } catch (e) {
            console.log(e);
        }
    }
}

const fighterService = new FighterService();

export {fighterService};
