/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSVoidFunctionReturnValueUsed

import sinon from "sinon";
import EscapePodController from "./EscapePodController";
import getEscapePodMock from "../mocks/EscapePodMock";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import EscapePodService from "../services/EscapePodService";
import { EscapePodMapper } from "../mappers/EscapePodMapper";
import NotFoundException from "../exceptions/NotFoundException";
import EscapePod from "../entities/EscapePod";
import {
  EscapePodCreateBody,
  EscapePodCreateRequest,
} from "../types/EscapePod/EscapePodCreateRequest";
import { EscapePodUpdateBody } from "../types/EscapePod/EscapePodUpdateRequest";


describe(
  "EscapePodController", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "getById should return 200 and escapePod on success and found escapePod", async () => {
        // Given
        const escapePodMock = getEscapePodMock();
        const fakeService = sinon.createStubInstance(EscapePodService);
        const fakeReq = getRequestMock({ params: { id: "1" } } );
        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);

        // When

        fakeService.getByKey.resolves(escapePodMock);

        // Then

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
        // Given
        const fakeService = sinon.createStubInstance(EscapePodService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);

        // When
        fakeService.getByKey.throws(new NotFoundException());

        // Then
        await expect(controller.getById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow(NotFoundException);
        expect(fakeService.getByKey.calledOnceWithExactly(
          "id", 1,
        )).toBeTruthy();
      },
    );

    it(
      "create should return 201 and escapePod created on success", async () => {

        // Given
        const escapePodMock = getEscapePodMock();
        const fakeService = sinon.createStubInstance(EscapePodService);
        const escapePodCreateBody: EscapePodCreateBody = {
          createdAt: escapePodMock.createdAt,
          id       : escapePodMock.id,
          updatedAt: escapePodMock.updatedAt,
        };
        const fakeReq: EscapePodCreateRequest = getRequestMock({
          body: escapePodCreateBody,
        });
        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);

        // When
        fakeService.create.resolves(escapePodMock);

        await controller.create(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.create.calledOnceWithExactly(escapePodCreateBody)).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({
          data: new EscapePodMapper().toDto(escapePodMock),
        })).toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(201)).toBeTruthy();

      },

    );

    it(
      "create should bubble up an exception", async () => {
        // Given

        const fakeService = sinon.createStubInstance(EscapePodService);
        const fakeReq = getRequestMock({});
        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);

        // When
        fakeService.create.throws();

        // Then
        await expect(controller.create(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.create.calledOnce).toBeTruthy();


      },

    );

    it(
      "updateById should return 200 and escapePod on success", async () => {
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

        // Given

        const escapePodUpdateBody: EscapePodUpdateBody = { createdAt: "2022-04-12T23:57:29.804Z" };
        const fakeService = sinon.createStubInstance(EscapePodService);
        const fakeReq = getRequestMock({
          body  : escapePodUpdateBody,
          params: { id: "1" },
        });

        // When
        const fakeRes = getResponseMock();
        const controller = new EscapePodController(fakeService);

        fakeService.updateById.throws();

        // Then
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
