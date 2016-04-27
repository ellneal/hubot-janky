# hubot-janky

Janky API integration. https://github.com/github/janky

Originally the [janky-script](https://github.com/github/hubot-scripts/blob/master/src/scripts/janky.coffee), now a script all on it's own.

See [`src/janky.coffee`](src/janky.coffee) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-janky --save`

Then add **hubot-janky** to your `external-scripts.json`:

```json
[
  "hubot-janky"
]
```

## Sample Interaction

```
user1>> hubot hello
hubot>> hello!
```
