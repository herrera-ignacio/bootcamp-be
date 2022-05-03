/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from "sinon";
import getSlotMock from "../mocks/SlotMock";
import SlotService from "../services/SlotService";
import SlotController from "./SlotController";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import { SlotMapper } from "../mappers/SlotMapper";
import {
  SlotUpdateBody,
  SlotUpdateRequest,
} from "../types/Slot/SlotUpdateRequest";
import Slot from "../entities/Slot";

describe(
  "SlotController", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore);

    it(
      "create should return 201 and create a new slot", async () => {
        // Given
        const slotMock = getSlotMock();
        const fakeService = sinon.createStubInstance(SlotService);
        const fakeReq = getRequestMock();
        const fakeRes = getResponseMock();
        const controller = new SlotController(fakeService);

        // When
        fakeService.create.resolves(slotMock);

        await controller.create(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.create.called).toBeTruthy();

        expect(fakeRes.status.calledWith(201)).toBeTruthy();

        expect(fakeRes.json.calledWith(sinon.match({
          data: new SlotMapper().toDto(slotMock),
        }))).toBeTruthy();
      },
    );

    it(
      "create should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(SlotService);
        const fakeReq = getRequestMock();
        const fakeRes = getResponseMock();
        const controller = new SlotController(fakeService);

        // When
        fakeService.create.throws();

        // Then
        await expect(controller.create(
          fakeReq, fakeRes as null, null,
        )).rejects.toThrow();

        expect(fakeService.create.calledOnce).toBeTruthy();
      },
    );

    it(
      "updateById should return 200 and booking", async () => {

        // Given
        const slotMock = getSlotMock();
        const fakeService = sinon.createStubInstance(SlotService);
        const controller = new SlotController(fakeService);
        const slotUpdateBody: SlotUpdateBody = {
          isDisabled: true,
        };
        const expectedSlot = {
          ...slotMock,
          ...slotUpdateBody,
        } as Slot;

        const fakeRes = getResponseMock();
        const fakeReq: SlotUpdateRequest = getRequestMock({
          body  : slotUpdateBody,
          params: { id: "1" },
        });

        fakeService.updateById.resolves(expectedSlot);

        await controller.updateById(
          fakeReq, fakeRes as any, null,
        );

        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id),
          slotUpdateBody,
        )).toBeTruthy();

        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();

      },

    );

    it(
      "updateById should bubble up exception", async () => {

        // Given

        const slotUpdateBody: SlotUpdateBody = {
          isDisabled: true,
        };
        const fakeService = sinon.createStubInstance(SlotService);
        const fakeReq = getRequestMock({
          body  : slotUpdateBody,
          params: { id: "1" },
        });

        // When
        const fakeRes = getResponseMock();
        const controller = new SlotController(fakeService);

        fakeService.updateById.throws();

        // Then
        await expect(controller.updateById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), slotUpdateBody,
        )).toBeTruthy();
      },
    );

    it(
      "deleteById should return 204 and delete a specific slot", async () => {
        // Given
        const fakeService = sinon.createStubInstance(SlotService);
        const controller = new SlotController(fakeService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();

        // When
        await controller.deleteById(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.deleteById.called).toBeTruthy();
        expect(fakeRes.sendStatus.calledWith(204)).toBeTruthy();
      },
    );

    it(
      "deleteById should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(SlotService);
        const controller = new SlotController(fakeService);
        const fakeReq = getRequestMock();
        const fakeRes = getResponseMock();

        // When
        fakeService.deleteById.throws();

        // Then
        await expect(controller.deleteById(
          fakeReq, fakeRes as null, null,
        )).rejects.toThrow();

        expect(fakeService.deleteById.called).toBeTruthy();
      },
    );
  },
);
