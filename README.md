# msgkit 🚧

WIP

## Install

```bash
pnpm i msgkit
```

## Usage

### Pushover [api](https://pushover.net/api)

```js
import { createPushover } from 'msgkit'
// or
import { createPushover } from 'msgkit/pushover'

const po = createPushover({ user: 'xxx', token: 'xxx' })

po.send({
  message: 'Here is the message content, which can be a bit long.',
  title: 'Here is the message title',
  // other options
})
```

### Bark [api](https://bark.day.app/#/tutorial)

```js
import { createBark } from 'msgkit'
// or
import { createBark } from 'msgkit/bark'

const bark = createBark({ token: 'xxx' })

bark.send({
  body: 'Here is the message content, which can be a bit long.',
  title: 'Here is the message title',
  // other options
})
```

### Wecom webhook [api](https://developer.work.weixin.qq.com/document/path/91770)

```js
import { createWecomWebhook } from 'msgkit'
// or
import { createWecomWebhook } from 'msgkit/wecom'

const ww = createWecomWebhook({ token: 'xxx' })

ww.send({
  type: 'text',
  message: {
    content: 'Here is the message content, which can be a bit long.',
  },
})
```

## License

MIT &copy; [0ahz](https://github.com/0ahz)
