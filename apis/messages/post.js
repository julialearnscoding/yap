var ref = require('ssb-ref')
var niceAgo = require('nice-ago')
var htmlEscape = require('html-escape')

var u = require('yap-util')
var toUrl = u.toUrl

module.exports = u.createRenderer(function render (data, apply) {
  var since = apply.since
  var time = data.value.timestamp || data.timestamp
  return ['div.Message',
    apply.cacheAttrs(toUrl('message', {id: data.key}), data.key, since),
    ['div.MessageSide',
      apply('avatar', {id: data.value.author, name: false, image: true}),
      ['a', {
        href: toUrl('message', {id: data.key}),
        title: new Date(time)+'\n'+data.key
      },
        ''+niceAgo(Date.now(), time)
      ]
    ],
    ['div.MessageMain',
      ['div.MessageMeta',
        apply('avatar', {id: data.value.author, name: true, image: false}),
        /*
        h('label.type', data.value.content.type),
        */
        ['label.msgId', data.key],

        data.value.content.channel
          ? ['a', {href: toUrl('public', {channel: data.value.content.channel})}, '#'+data.value.content.channel]
          : '',

        ['a', {href: toUrl('thread', {id: data.value.content.root || data.key})}, 'Thread']

      ],
      ['div.MessageContent', u.markdown(data.value.content)]
    ]
  ]
})






