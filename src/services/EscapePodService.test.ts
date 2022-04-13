import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import NotFoundException from "../exceptions/NotFoundException";
import EscapePod  from "../entities/EscapePod";
import getEscapePodMock from "../mocks/EscapePodMock";
import IRepository from "../types/IRepository";
import EscapePodService from "./EscapePodService";


describe(
  "EscapePodService", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    /* GET REQUESTS */


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

    it(
      "create success", async () => {
        const escapePodMock = getEscapePodMock();
        const fakeRepo = stubInterface<IRepository<EscapePod>>();
        const userInput = {};

        // When
        fakeRepo.save.resolves(escapePodMock);
        sandbox.replace(
          EscapePodService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        const res = await new EscapePodService().create(userInput);

        expect(fakeRepo.save.calledOnceWithExactly(userInput)).toBeTruthy();
        expect(res).toEqual(escapePodMock);

      },

    );

    it(
      "create fails due to missing params", async () => {

        const fakeRepo = stubInterface<IRepository<EscapePod>>();

        fakeRepo.save.throws();
        sandbox.replace(
          EscapePodService.prototype, "getRepository", () => fakeRepo,
        );

        await expect(new EscapePodService().create({
          createdAt: undefined,
          updatedAt: undefined,
        }))
          .rejects.
          toThrow();

        expect(fakeRepo.save.calledOnce).toBeTruthy();

      },
    );

    it(
      "updateById success", async () => {
        // Given
        const escapePodMock = getEscapePodMock();
        const expectedEscapePod = {
          ...escapePodMock,
          createdAt: "2022-04-12T23:57:29.804Z",
        };
        const fakeRepo = stubInterface<IRepository<EscapePod>>();
        const getByKey = sinon.fake.resolves(escapePodMock);

        // When
        fakeRepo.save.resolvesArg(0);
        sandbox.replace(
          EscapePodService.prototype, "getByKey", getByKey,
        );
        sandbox.replace(
          EscapePodService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new EscapePodService().updateById(
          escapePodMock.id, { createdAt: expectedEscapePod.createdAt },
        );

        // Then
        expect(getByKey.calledOnceWithExactly(
          "id", escapePodMock.id,
        )).toBeTruthy();
        expect(fakeRepo.save.calledOnceWithExactly({
          ...escapePodMock,
          createdAt: expectedEscapePod.createdAt,
        })).toBeTruthy();
        expect(res).toEqual(expectedEscapePod);
      },

    );

    it(
      "updateById not found", async () => {
        // Given
        const getByKey = sinon.fake.throws(new NotFoundException(""));

        // When
        sandbox.replace(
          EscapePodService.prototype, "getByKey", getByKey,
        );
        const escapePodService = new EscapePodService();

        // Then
        await expect(escapePodService.updateById(
          999, {},
        )).rejects.toThrow(NotFoundException);
        expect(getByKey.calledOnceWithExactly(
          "id", 999,
        )).toBeTruthy();
      },
    );

  },
);
