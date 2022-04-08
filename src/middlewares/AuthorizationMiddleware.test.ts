import sinon from "sinon";
import getRequestMock from "../mocks/RequestMock";
import AdminAuthorization from "./AuthorizationMiddleware";
import getAuthMock from "../mocks/AuthMock";

describe(
  "AuthorizationMiddleware", ()=>{
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    /* Test for getById endpoint */

    it(
      "AdminAuthorization should return 200 and return data", async () =>{
        // Given
        let authMock = getAuthMock;
        const fakeReq = getRequestMock({ auth: { sub:"google-oauth2|117507597222637272211" } } );
        

        // When
        AdminAuthorization()

        // Then


      },
    );

    it(
      "AdminAuthorization should bubble up exception", async () => {
        // Given
        const fakeReq = getRequestMock({ auth: { id:"1" } } );

        // When

        // Then

      },
    );

  },
);