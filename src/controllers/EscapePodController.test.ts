/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from "sinon";
import EscapePodController from "./EscapePodController";
import getEscapePodMock from "../mocks/EscapePod";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import { EscapePodMapper } from "../mappers/EscapePodMapper";
import NotFoundException from "../exceptions/NotFoundException";
import EscapePodService from "../services/EscapePodService";
import { EscapePodUpdateBody } from "../types/EscapePod/EscapePodUpdateRequest";
import { EscapePodCreateRequest } from "../types/EscapePod/EscapePodCreateRequest";
import EscapePod from "../entities/EscapePod";

describe(
  "UserController", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    /* Test for getbyId endpoint */

    it(
      "getById should return 200 and user on success and found user", async () => {

        const escapePodMock = getEscapePodMock();
        const fakeService = sinon.createStubInstance(EscapePodService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);


        fakeService.getByKey.resolves(escapePodMock);

        await controller.getById(
          fakeReq, fakeRes as any, null,
        );

        expect(fakeService.getByKey.calledOnceWithExactly(
          "id", escapePodMock.id,
        )).toBeTruthy();

        expect(fakeRes.json.calledOnceWithExactly({
          data: new EscapePodMapper().toDto(escapePodMock),
        })).toBeTruthy();

        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();

      },

    );

    it(
      "getById should bubble up exception", async () => {

        const fakeService = sinon.createStubInstance(EscapePodService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);


        fakeService.getByKey.throws(new NotFoundException());

        await expect(controller.getById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow(NotFoundException);

        expect(fakeService.getByKey.calledOnceWithExactly(
          "id", 1,
        )).toBeTruthy();


      },

    );

    it(
      "updateById should return 200 and user on success", async () => {
        // Given
        const escapePodUpdateBody: EscapePodUpdateBody = { createdAt: "2022-04-12T23:57:29.804Z" };
        const expectedEscapePod = {
          ...getEscapePodMock(),
          ...escapePodUpdateBody,
        } as EscapePod;

        const fakeService = sinon.createStubInstance(EscapePodService);
        const fakeReq: EscapePodCreateRequest = getRequestMock({
          body  : escapePodUpdateBody,
          params: { id: "1" },
        });


        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);

        // When
        fakeService.updateById.resolves(expectedEscapePod);

        await controller.updateById(
          fakeReq, fakeRes as any, null,
        );

        // Then

        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), escapePodUpdateBody,
        )).toBeTruthy();

        expect(fakeRes.json.calledOnceWithExactly({
          data: new EscapePodMapper().toDto(expectedEscapePod),
        }))
          .toBeTruthy();

        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();

      },
    );


    it(
      "updateById should bubble up exception", async () => {

        const escapePodUpdateBody: EscapePodUpdateBody = { createdAt: "2022-04-12T23:57:29.804Z" };
        const fakeService = sinon.createStubInstance(EscapePodService);
        const fakeReq = getRequestMock({
          body  : escapePodUpdateBody,
          params: { id: "1" },
        });

        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);

        fakeService.updateById.throws();


        await expect(controller.updateById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), escapePodUpdateBody,
        )).toBeTruthy();
      },

    );

  },
);
