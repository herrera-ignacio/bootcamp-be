import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import NotFoundException from "../exceptions/NotFoundException";
import User, { UserRole }  from "../entities/User";
import getUserMock from "../mocks/UserMock";
import IRepository from "../types/IRepository";
import UserService from "./UserService";


describe(
  "UserService", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    /* GET REQUESTS */

    /* Get By Id Success */

    it(
      "getById success", async () => {
        // Given
        const userMock = getUserMock();
        const fakeRepo = stubInterface<IRepository<User>>();

        // When


        fakeRepo.findOneBy.resolves(userMock);
        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new UserService().getByKey(
          "id", userMock.id,
        );


        // Then

        expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: userMock.id })).toBeTruthy();
        expect(res).toEqual(userMock);
      },

    );

    /* Get By Id. Not Found. */

    it(
      "getById Not Found", async () => {

        // Given
        const fakeRepo = stubInterface<IRepository<User>>();

        // When

        fakeRepo.findOneBy.resolves(null);
        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );

        const userService = new UserService();

        // Then
        await expect(userService.getByKey(
          "id", 999,
        )).rejects.toThrow(NotFoundException);
        expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: 999 })).toBeTruthy();

      },
    );

    /* Get By Email Success */

    it(
      "getByEmail on success", async () => {

        // Given
        const userMock = getUserMock();
        const fakeRepo = stubInterface<IRepository<User>>();


        // When

        fakeRepo.findOneBy.resolves(userMock);
        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new UserService().getByKey(
          "email", userMock.email,
        );

        // Then

        expect(fakeRepo.findOneBy.calledOnceWithExactly( { email: userMock.email } )).toBeTruthy();
        expect(res).toBe(userMock);

      },
    );

    /* Get By Email. Not found */

    it(
      "getByEmail not found", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<User>>();

        // When
        fakeRepo.findOneBy.resolves(null);
        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        await expect(new UserService().getByKey(
          "email",
          "test@example.com",
        ))
          .rejects.toThrow(NotFoundException);
        expect(fakeRepo.findOneBy.
          calledOnceWithExactly({ email: "test@example.com" })).toBeTruthy();
      },
    );

    it(
      "create success", async () => {
        // Given
        const userMock = getUserMock();
        const fakeRepo = stubInterface<IRepository<User>>();
        const userInput = {
          email: "test@example.com",
          role : UserRole.CONTRACTOR,
        };

        // When
        fakeRepo.save.resolves(userMock);
        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new UserService().create(userInput);

        // Then
        expect(fakeRepo.save.calledOnceWithExactly(userInput)).toBeTruthy();
        expect(res).toEqual(userMock);
      },
    );

    it(
      "create fails due to missing params", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<User>>();

        // When
        fakeRepo.save.throws();
        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        await expect(new UserService().create({
          email: undefined,
          role : undefined,
        }))
          .rejects
          .toThrow();
        expect(fakeRepo.save.calledOnce).toBeTruthy();
      },
    );

    it(
      "updateById success", async () => {
        // Given
        const userMock = getUserMock();
        const expectedUser = {
          ...userMock,
          email: "new@example.com",
        };
        const fakeRepo = stubInterface<IRepository<User>>();
        const getByKey = sinon.fake.resolves(userMock);

        // When
        fakeRepo.save.resolvesArg(0);
        sandbox.replace(
          UserService.prototype, "getByKey", getByKey,
        );
        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new UserService().updateById(
          userMock.id, { email: expectedUser.email },
        );

        // Then
        expect(getByKey.calledOnceWithExactly("id", userMock.id)).toBeTruthy();
        expect(fakeRepo.save.calledOnceWithExactly({
          ...userMock,
          email: expectedUser.email,
        })).toBeTruthy();
        expect(res).toEqual(expectedUser);
      },
    );

    it(
      "updateById not found", async () => {
        // Given
        const getByKey = sinon.fake.throws(new NotFoundException(""));

        // When
        sandbox.replace(
          UserService.prototype, "getByKey", getByKey,
        );
        const userService = new UserService();

        // Then
        await expect(userService.updateById(
          999, {},
        )).rejects.toThrow(NotFoundException);
        expect(getByKey.calledOnceWithExactly("id", 999)).toBeTruthy();
      },
    );


    /* DELETE REQUEST */

    it(
      "deleteById success", async () => {

        // Given
        const fakeRepo = stubInterface<IRepository<User>>();

        // when
        fakeRepo.delete.resolves({
          affected: 1,
          raw     : undefined,
        });

        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );

        const res = await new UserService().deleteById(1);

        // Then

        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();
        expect(res).toBeUndefined();
      },
    );

    it(
      "deleteById should throw when not found", async () => {

        // Given
        const fakeRepo = stubInterface<IRepository<User>>();

        // When
        fakeRepo.delete.resolves({
          affected: 0,
          raw     : undefined,
        });

        sandbox.replace(
          UserService.prototype, "getRepository", () => fakeRepo,
        );

        const userService = new UserService();

        // Then

        await expect(userService.deleteById(1)).rejects.toThrow(NotFoundException);
        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();

      },
    );



  },
);
