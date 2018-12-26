import test from 'ava'
import * as utils from '../source/libs/utils'

test('isEmpty', t => {
  t.true(utils.isEmpty(''))
  t.true(utils.isEmpty(null))
  t.true(utils.isEmpty({}))
  t.true(utils.isEmpty([]))
  t.false(utils.isEmpty('f'))
  t.false(utils.isEmpty(['f']))
  t.false(utils.isEmpty({f: false}))
})

test('renderData', t => {
  const data = [
    {
      type: 'test',
      name: 'no name',
      link: 'link'
    },
    {
      type: 'holder',
      name: 'name',
      link: 'link'
    },
    {
      type: 'holder',
      name: 'no link',
      link: null
    },
  ]
  t.is(utils.renderData(data), '<a href="link" rel="noopener noreferrer" target="_blank">name</a>, no link')
})
