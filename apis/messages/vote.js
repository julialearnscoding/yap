var u = require('yap-util')
module.exports = u.createRenderer(function (data, apply) {
  return ['div.Message',
    //currently, a vote message has no need for a cache tag.
    //unless we decide to show other peers that have liked this.
    //u.cacheTag(toUrl('message', {id: data.key}), data.key, ),
    ['h3', 'Yup!'],
    ['div.EmbeddedMessage',
      apply('message', {id: data.value.content.vote && data.value.content.vote.link}),
    ]
  ]
})


