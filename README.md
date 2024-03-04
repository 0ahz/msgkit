# msgkit 🚧

WIP

## Install

```bash
pnpm i msgkit
```

## Usage

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

## License

MIT &copy; [0ahz](https://github.com/0ahz)
