import { createAction, props } from "@ngrx/store";
import { IUser } from "../../interfaces/user.interface";

export const login = createAction(
  '[Assessment App] Login',
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Assessment App] Login Success',
  props<{ userResponse: IUser }>(),
);

export const loginError = createAction(
  '[Assessment App] Login Error',
  props<{ error: string }>(),
);


export const AuthActions = {
  login,
  loginSuccess,
  loginError,
}
