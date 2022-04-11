import User, { UserRole } from "../entities/User";


const getUserMock = () => User.build({
  createdAt: new Date().toDateString(),
  email    : "ignacioromanherrera@gmail.com",
  firstName: "Nacho",
  id       : 1,
  lastName : "Herrera",
  role     : UserRole.ADMIN,
  updatedAt: new Date().toDateString(),
});

export default getUserMock;
