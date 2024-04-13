# msgkit 🚧

WIP

## Install

```bash
pnpm i msgkit
```

## Usage

### Pushover

https://pushover.net/api

```js
import { Pushover } from 'msgkit'
// or
import { Pushover } from 'msgkit/pushover'

await Pushover.send({
  user: 'xxx',
  token: 'xxx',
  title: 'Here is the message title',
  message: 'Here is the message content, which can be a bit long.',
  // other options
})

// or

const po = new Pushover({ user: 'xxx', token: 'xxx' })

await po.send({
  message: 'Here is the message content, which can be a bit long.',
  title: 'Here is the message title',
  // other options
})
```

### Bark

https://bark.day.app/#/tutorial

```js
import { Bark } from 'msgkit'
// or
import { Bark } from 'msgkit/bark'

// token=xxx
// or url
// token=https://api.day.app/xxx

Bark.send({
  token: 'xxx',
  title: 'Here is the message title',
  body: 'Here is the message content, which can be a bit long.',
  // other options
})

// or

const bark = new Bark({ token: 'xxx' })

bark.send({
  title: 'Here is the message title',
  body: 'Here is the message content, which can be a bit long.',
  // other options
})
```

### Wecom webhook

https://developer.work.weixin.qq.com/document/path/91770

```js
import { WecomWebhook } from 'msgkit'
// or
import { WecomWebhook } from 'msgkit/wecom'

// token=xxx
// or url
// token=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx

WecomWebhook.send({
  token: 'xxx',
  type: 'text',
  message: {
    content: 'Here is the message content, which can be a bit long.',
  },
})

// or

const hook = new WecomWebhook({ token: 'xxx' })

hook.send({
  type: 'text',
  message: {
    content: 'Here is the message content, which can be a bit long.',
  },
})
```

### Feishu webhook

https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot

```js
import { FeishuWebhook } from 'msgkit'
// or
import { FeishuWebhook } from 'msgkit/feishu'

// token=xxx
// or url
// token=https://open.feishu.cn/open-apis/bot/v2/hook/xxx

FeishuWebhook.send({
  token: 'xxx',
  type: 'text',
  message: {
    text: 'Here is the message content, which can be a bit long.',
  },
})

// or

const hook = new FeishuWebhook({ token: 'xxx' })

hook.send({
  type: 'text',
  message: {
    text: 'Here is the message content, which can be a bit long.',
  },
})
```

## License

MIT &copy; [0ahz](https://github.com/0ahz)
