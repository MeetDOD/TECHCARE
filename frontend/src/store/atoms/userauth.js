import { atom, selector } from "recoil";
import axios from "axios";

export const userTokenState = atom({
    key:"tokenState",
    default:localStorage.getItem("token")
});

export const userState = selector({
    key : 'authState',
    
})