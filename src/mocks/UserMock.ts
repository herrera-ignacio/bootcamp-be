import User, { UserRole } from "../entities/User";


const getUserMock = () => User.build({
  id             : 1,
  createdAt      : new Date().toDateString(),
  updatedAt      : new Date().toDateString(),
  email          : "ignacioromanherrera@gmail.com",
  firstName      : "Nacho",
  lastName       : "Herrera",
  role           : UserRole.ADMIN,
});

export default getUserMock;