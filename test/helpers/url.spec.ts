import { buildURL } from '../../src/helpers/url'

describe('helpers:url',()=>{
  describe('isXXX',()=>{
      test('should support null params', () => {
          expect(buildURL('/foo')).toBe('/foo')
      })

    test('should support params', () => {
      expect(buildURL('/foo',{a:1})).toBe('/foo?a=1')
    })

    test('should support special char params', () => {
      expect(buildURL('/foo',{a:'@:$, []'})).toBe('/foo?a=@:$,+[]')
    })

    test('should support date transform toISOString', () => {
      const date = new Date()
      expect(buildURL('/foo',{a: date})).toBe(`/foo?a=${date.toISOString()}`)
    })

    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })

    test('should correct discard url hash mark', () => {
      expect(
        buildURL('/foo?foo=bar#hash', {
          query: 'baz'
        })
      ).toBe('/foo?foo=bar&query=baz')
    })

    test('should support array params', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('should support params val null', () => {
      expect(
        buildURL('/foo', {
          foo: ''
        })
      ).toBe('/foo')
    })

    test('should support object params', () => {
      expect(
        buildURL('/foo', {
          foo: {a:1}
        })
      ).toBe(`/foo?foo=${encodeURI('{"a":1}')}`)
    })

     
  })
})