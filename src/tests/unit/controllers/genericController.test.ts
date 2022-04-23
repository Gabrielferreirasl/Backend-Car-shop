import { expect } from "chai";
import mongoose from 'mongoose';
import Sinon from "sinon";
import GenericService from "../../../services/GenericService";
import GenericController from "../../../controllers/GenericController";
import GenericModel from "../../../models/GenericModel";
import { Request, Response } from "express";

describe('GenericController', () => {
    const GenericSchema = new mongoose.Schema({ title: String });
    const genericDAO = new GenericModel(mongoose.model('GenericController', GenericSchema));
    const genericService = new GenericService(genericDAO);
    const genericController = new GenericController(genericService);

    const testMock = {
      _id: '1',
      title: 'abc',
    }
  
    const testMockArray = [testMock];

    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(obj) {
        this.body = obj;
        return this;
      },
    } as Response & { body: any };

    const req = {} as Request;
    req.params = { id: new mongoose.Types.ObjectId().toString() };
    req.body = testMock;

    describe('#read', () => {
      before(() => {
        Sinon.stub(genericController.service, 'read').resolves(testMockArray);
      });
  
      after(() => {
        Sinon.restore();
      })
  
      it('must return an list', async () => {
        await genericController.read(req, res);
        expect(res.body).to.be.eq(testMockArray);
      });

      it('must return the code: 200', async () => {
        await genericController.read(req, res);
        expect(res.statusCode).to.be.eq(200);
      });
    });
  
    describe('#create', () => {
      before(() => {
        Sinon.stub(genericController.service, 'create').resolves(testMock);
      });
  
      after(() => {
        Sinon.restore();
      })
  
      it('must return an object', async () => {
        req.body = testMock;
        await genericController.create(req, res);
        expect(res.body).to.be.deep.equal(testMock);
      });

      it('must return the code: 201', async () => {
        req.body = testMock;
        await genericController.create(req, res);
        expect(res.statusCode).to.be.equal(201);
      });

    });
  
    describe('#readOne', () => {
        describe('when the document exists', async () => {
            before(() => {
                Sinon.stub(genericController.service, 'readOne').resolves(testMock);
              });
          
              after(() => {
                Sinon.restore();
              })

            it('must return an object', async () => { 
                await genericController.readOne(req, res);
                expect(res.body).to.be.deep.eq(testMock);
            });

            it('must return the code: 200', async () => {
                await genericController.readOne(req, res);
              expect(res.statusCode).to.be.equal(200);
            });
            
        })
      })

        describe('when the document dont exists', async () => {
            before(() => {
                Sinon.stub(genericController.service, 'readOne').resolves(null);
              });
          
              after(() => {
                Sinon.restore();
              })

            it('must return a message of error', async () => {
                await genericController.readOne(req, res);
                expect(res.body).to.be.deep.eq({ error: 'Object not found' });
              });

              it('must return the code: 404', async () => {
                await genericController.readOne(req, res);
                expect(res.statusCode).to.be.eq(404);
              });
            });

            describe('when the id is invalid', async () => {
              before(() => {
                  Sinon.stub(genericController.service, 'readOne').resolves(null);
                  req.params.id = '1';
                });
            
                after(() => {
                  Sinon.restore();
                })
  
              it('must return a message of error', async () => {
                  await genericController.readOne(req, res);
                  expect(res.body).to.be.deep.eq({ error: 'Id must have 24 hexadecimal characters' });
                });
  
                it('must return the code: 404', async () => {
                  await genericController.readOne(req, res);
                  expect(res.statusCode).to.be.eq(400);
                });
              });
  
    describe('#update', () => {
        const mockUpdate = {
            _id: '1',
            title: 'abcde'
        };

      describe('when the document exists', async () => {
        before(() => {
            Sinon.stub(genericController.service, 'readOne').resolves(testMock);
            Sinon.stub(genericController.service, 'update').resolves(mockUpdate);
            req.body = mockUpdate;
          });
      
          after(() => {
            Sinon.restore();
          })

      it('must return an object', async () => {
        await genericController.update(req, res);
        expect(res.body).to.be.deep.equal(mockUpdate);
      });

      it('must return the code: 201', async () => {
        await genericController.update(req, res);
        expect(res.statusCode).to.be.equal(201);
      });
    });

    describe('when the document dont exists', async () => {
        before(() => {
            Sinon.stub(genericController.service, 'readOne').resolves(null);
            Sinon.stub(genericController.service, 'update').resolves(null);
            req.body = mockUpdate;
          });
      
          after(() => {
            Sinon.restore();
          })

      it('must return a message of error', async () => {
        await genericController.update(req, res);
        expect(res.body).to.be.deep.eq({ error: 'Not found'});
      });

      it('must return the code: 404', async () => {
        await genericController.update(req, res);
        expect(res.statusCode).to.be.equal(404);
      });
    });
});
  
    describe('#delete', () => {
        describe('when the document exists', async () => {
            before(() => {
              Sinon.stub(genericController.service, 'readOne').resolves(testMock);
              Sinon.stub(genericController.service, 'delete').resolves(testMock);
            });
          
              after(() => {
                Sinon.restore();
              })
    
              it('must return an object', async () => {
                await genericController.delete(req, res);
                expect(res.body).to.be.deep.equal(testMock);
              });

              it('must return the code: 201', async () => {
                await genericController.delete(req, res);
                expect(res.statusCode).to.be.equal(201);
              });
        });
        describe('when the document dont exists', async () => {
            before(() => {
                Sinon.stub(genericController.service, 'readOne').resolves(null);
                Sinon.stub(genericController.service, 'delete').resolves(null);
            });
          
              after(() => {
                Sinon.restore();
              })
    
              it('must return a message of error', async () => {
                await genericController.delete(req, res);
                expect(res.body).to.be.deep.eq({ error: 'Not found'});
              });

              it('must return the code: 404', async () => {
                await genericController.delete(req, res);
                expect(res.statusCode).to.be.equal(404);
              });
        });
    });
  })