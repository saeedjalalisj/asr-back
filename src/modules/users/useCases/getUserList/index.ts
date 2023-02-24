import {GetUserList} from "./GetUserList";
import {userRepo} from "../../repos";
import {GetUserListController} from "./GetUserListController";

const getUserList = new GetUserList(userRepo)

const getUserListController = new GetUserListController(getUserList);

export {
    getUserList,
    getUserListController
}