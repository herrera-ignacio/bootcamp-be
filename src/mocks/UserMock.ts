import User, { UserRole } from "../entities/User";


const getUserMock = () => User.build({
  id             : 13,
  createdAt      : new Date().toDateString(),
  updatedAt      : new Date().toDateString(),
  email          : "jdsarmiento20@gmail.com",
  firstName      : "Nacho",
  lastName       : "Herrera",
  role           : UserRole.ADMIN,
});

export default getUserMock;