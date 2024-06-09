import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  getAll() {
    try {
      return userRepository.getAll();
    } catch (e) {
      console.log(e);
    }
  }

  getBy(repoKey) {
    try {
      // if (Object.keys(repoKey)[0] === "name") {
      //   return userRepository.getByName(repoKey);
      // }
      return userRepository.getOne(repoKey);
    } catch (e) {
      console.log(e);
    }
  }

  getById(id) {
    return this.getBy({id});
  }

  create(body) {
    try {
      return userRepository.create(body);
    } catch (e) {
      console.log(e);
    }
  }

  update(id, body) {
    try {
      return userRepository.update(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  delete(id) {
    try {
      return userRepository.delete(id);
    } catch (e) {
      console.log(e);
    }
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
