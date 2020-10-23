import {
    isDate,
    isPlainObject
  } from '../../src/helpers/util'

  describe('helpers:util',()=>{
    describe('isXXX',()=>{
        test('should validate Date', () => {
            expect(isDate(new Date())).toBeTruthy()
            expect(isDate(Date.now())).toBeFalsy()
        })
        test('should validate Object', () => {
            expect(isPlainObject({})).toBeTruthy()
            expect(isPlainObject(new Date())).toBeFalsy()
        })  
    })
  })
  