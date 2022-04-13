import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import NotFoundException from "../exceptions/NotFoundException";
import EscapePod  from "../entities/EscapePod";
import getEscapePodMock from "../mocks/EscapePod";
import IRepository from "../types/IRepository";
import EscapePodService from "./EscapePodService";

describe(
  "UserService", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    /* GET REQUESTS */

    /* Get By Id Success */

    it(
      "getById success", async () => {
        // Given
        const escapePodMock = getEscapePodMock();
        const fakeRepo = stubInterface<IRepository<EscapePod>>();

        // When
        fakeRepo.findOneBy.resolves(escapePodMock);
        sandbox.replace(
          EscapePodService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new EscapePodService().getByKey(
          "id", escapePodMock.id,
        );


        // Then

        expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: escapePodMock.id })).toBeTruthy();
        expect(res).toEqual(escapePodMock);
      },

    );

    /* Get By Id. Not Found. */

    it(
      "getById Not Found", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<EscapePod>>();

        // When
        fakeRepo.findOneBy.resolves(null);
        sandbox.replace(
          EscapePodService.prototype, "getRepository", () => fakeRepo,
        );

        const escapePodService = new EscapePodService();
        // Then

        await expect(escapePodService.getByKey(
          "id", 999,
        )).rejects.toThrow(NotFoundException);
        expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: 999 })).toBeTruthy();

      },
    );

  },
);
