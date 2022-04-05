import { UserMapper } from "./UserMapper";
import getUserMock from "../mocks/UserMock";

describe(
  "UserMapper", () => {

    it(
      "User to UserDto", () => {
    
        const user = getUserMock();
        const userDto = new UserMapper().toDto(user);
        
        console.log(userDto);

        expect(userDto).toEqual({
          id: user.id,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        });
      },
    );
  },
);