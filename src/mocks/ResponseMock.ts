import sinon from "sinon";

const getResponseMock = () => {
  const res: Record<string, sinon.SinonStub> = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();
  res.sendStatus = sinon.stub();
  return res;
};

export default getResponseMock;
