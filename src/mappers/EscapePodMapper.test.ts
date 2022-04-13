import { EscapePodMapper } from "./EscapePodMapper";
import getEscapePodMock from "../mocks/EscapePod";

describe(
  "EscapePodMapper", () => {

    it(
      "EscapePod to UserDto", () => {

        const escapePod = getEscapePodMock();
        const escapePodDto = new EscapePodMapper().toDto(escapePod);


        expect(escapePodDto).toEqual({
          createdAt: new Date(escapePod.createdAt),
          id       : escapePod.id,
          updatedAt: new Date(escapePod.updatedAt),
        });

      },
    );
  },
);
