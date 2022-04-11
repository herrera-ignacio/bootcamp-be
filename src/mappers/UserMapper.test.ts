import { UserMapper } from "./UserMapper";
import getUserMock from "../mocks/UserMock";

describe(
  "UserMapper", () => {

    it(
      "User to UserDto", () => {

        const user = getUserMock();
        const userDto = new UserMapper().toDto(user);


        expect(userDto).toEqual({
          createdAt: new Date(user.createdAt),
          email    : user.email,
          firstName: user.firstName,
          id       : user.id,
          lastName : user.lastName,
          role     : user.role,
          updatedAt: new Date(user.updatedAt),
        });
      },
    );
  },
);
