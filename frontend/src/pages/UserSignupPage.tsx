// import { SignupPage } from "../components/SignUp"
// const data = [{label:"First Name", placeholder:"John"}, {}]
// export const UserSignupPage = () => {
//   return (
//     <div><SignupPage </div>
//   )
// }

import { Signup } from "../components/SignUp";

export const UserSignupPage = () => {
  return (
    <div>
      <Signup userType="user" />
    </div>
  );
};
