import sinon from "sinon";
import getSlotMock from "../mocks/SlotMock";
import SlotService from "../services/SlotService";
import SlotController from "./SlotController";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import { SlotMapper } from "../mappers/SlotMapper";

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
  },
);