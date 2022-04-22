import { expect } from 'chai';
import Sinon from "sinon";
import mongoose from 'mongoose';
import GenericModel from '../../../models/GenericModel';

describe('Generic Model', () => {
  const GenericSchema = new mongoose.Schema({ title: String });
  let genericDAO = new GenericModel(mongoose.model('Generic', GenericSchema));

  const testMock = {
    _id: '1',
    title: 'abc',
  }

  const testMockArray = [testMock];

  describe('#read', () => {
    before(() => {
      Sinon.stub(genericDAO.model, 'find').resolves(testMockArray);
    });

    after(() => {
      Sinon.restore();
    })

    it('must return an list', async() => {
      const profiles = await genericDAO.read();
      expect(profiles).to.deep.eq(testMockArray);
    });
  });

  describe('#create', () => {
    before(() => {
      Sinon.stub(genericDAO.model, 'create').resolves(testMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('must return an object', async () => {
      const profile = await genericDAO.create(testMock);
      expect(profile).to.deep.equal(testMock);
    })
  });

  describe('#readOne', () => {
    describe('when the id exists', () => {
      before(() => {
        Sinon.stub(genericDAO.model, 'findOne').resolves(testMock);
      });
  
      after(() => {
        Sinon.restore();
      })
  
      it('must return an object', async () => {
        const profile = await genericDAO.readOne(testMock._id);
        expect(profile).to.deep.equal(testMock);
      })
    });

    describe('when the document dont exist', () => {
      before(() => {
        Sinon.stub(genericDAO.model, 'findOne').resolves(null);
      });

      after(() => {
        Sinon.restore();
      });

      it('must return null', async () => {
        const profile = await genericDAO.readOne('9999');
        expect(profile).to.be.null;
      })
    })
  });

  describe('#update', () => {
    const mockUpdated = { 
      _id: '1',
      title: 'abcde123',
    }

    before(() => {
      Sinon.stub(genericDAO.model, 'findByIdAndUpdate').resolves(mockUpdated);
    });

    after(() => {
      Sinon.restore();
    });

      it('must return an object', async () => {
        const profile = await genericDAO.update(testMock._id, mockUpdated);
        expect(profile).to.deep.equal(mockUpdated);
      })
  });

  describe('#delete', () => {
      before(() => {
        Sinon.stub(genericDAO.model, 'findByIdAndDelete').resolves(testMock);
      });
  
      after(() => {
        Sinon.restore();
      })
  
      it('must return an object', async () => {
        const profile = await genericDAO.delete(testMock._id);
        expect(profile).to.deep.equal(testMock);
      })
  });
})