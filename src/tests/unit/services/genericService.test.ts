import { expect } from "chai";
import mongoose from 'mongoose';
import Sinon from "sinon";
import GenericModel from "../../../models/GenericModel";
import GenericService from "../../../services/GenericService";

describe('GenericService', () => {
    const GenericSchema = new mongoose.Schema({ title: String });
    const genericDAO = new GenericModel(mongoose.model('GenericService', GenericSchema));
    const genericService = new GenericService(genericDAO);

    const testMock = {
        _id: '1',
        title: 'abc',
      }
    
      const testMockArray = [testMock];
  
    describe('#read', () => {
      before(() => {
        Sinon.stub(genericService.model, 'read').resolves(testMockArray);
      });
  
      after(() => {
        Sinon.restore();
      })
  
      it('must return an list', async () => {
        const profiles = await genericService.read();
        expect(profiles).to.be.deep.equal(testMockArray);
      });
    });
  
    describe('#create', () => {
      before(() => {
        Sinon.stub(genericService.model, 'create').resolves(testMock);
      });
  
      after(() => {
        Sinon.restore();
      })
  
      it('must return an object', async () => {
        const profile = await genericService.create(testMock);
        expect(profile).to.be.deep.equal(testMock);
      });
    });
  
    describe('#readOne', () => {
        describe('when the document exists', async () => {
            before(() => {
                Sinon.stub(genericService.model, 'readOne').resolves(testMock);
              });
          
              after(() => {
                Sinon.restore();
              })

            it('must return an object', async () => {
                const profile = await genericService.readOne(testMock._id);
                expect(profile).to.be.deep.eq(testMock);
              });
            });
        })

        describe('when the document dont exists', async () => {
            before(() => {
                Sinon.stub(genericService.model, 'readOne').resolves(null);
              });
          
              after(() => {
                Sinon.restore();
              })

            it('must return null', async () => {
                const profile = await genericService.readOne('0');
                expect(profile).to.be.null;
              });
            });

    
  
    describe('#update', () => {
        const mockUpdate = {
            _id: '1',
            title: 'abcde'
        };

      describe('when the document exists', async () => {
        before(() => {
            Sinon.stub(genericService.model, 'readOne').resolves(testMock);
            Sinon.stub(genericService.model, 'update').resolves(mockUpdate);
          });
      
          after(() => {
            Sinon.restore();
          })

      it('must return an object', async () => {
        const profile = await genericService.update(mockUpdate._id, testMock);
        expect(profile).to.be.deep.equal(mockUpdate);
      });
    });

    describe('when the document dont exists', async () => {
        before(() => {
            Sinon.stub(genericService.model, 'readOne').resolves(null);
            Sinon.stub(genericService.model, 'update').resolves(testMock);
          });
      
          after(() => {
            Sinon.restore();
          })

      it('must return null', async () => {
        const profile = await genericService.update('0', testMock);
        expect(profile).to.be.null;
      });
    });
});
  
    describe('#delete', () => {
        describe('when the document exists', async () => {
            before(() => {
                Sinon.stub(genericService.model, 'readOne').resolves(testMock);
                Sinon.stub(genericService.model, 'delete').resolves(testMock);
              });
          
              after(() => {
                Sinon.restore();
              })
    
              it('must return an object', async () => {
                const profile = await genericService.delete(testMock._id);
                expect(profile).to.be.deep.equal(testMock);
              });
        });
        describe('when the document dont exists', async () => {
            before(() => {
                Sinon.stub(genericService.model, 'readOne').resolves(null);
                Sinon.stub(genericService.model, 'delete').resolves(testMock);
              });
          
              after(() => {
                Sinon.restore();
              })
    
          it('must return null', async () => {
            const profile = await genericService.delete('0');
            expect(profile).to.be.null;
          });
        });
    });
  })