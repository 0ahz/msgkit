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
import { createBark } from 'msgkit/pushover'

const bark = createBark({ token: 'xxx' })

bark.send({
  body: 'Here is the message content, which can be a bit long.',
  title: 'Here is the message title',
  // other options
})
```

## License

MIT &copy; [0ahz](https://github.com/0ahz)
