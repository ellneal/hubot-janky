chai = require 'chai'
sinon = require 'sinon'
chai.use require 'sinon-chai'

expect = chai.expect

describe "janky", ->
  beforeEach ->
    process.env.HUBOT_JANKY_URL = "http://janky.example.com"
    @robot =
      respond: sinon.spy()
      hear: sinon.spy()
      router:
        post: sinon.spy()

    require('../src/janky')(@robot)

  describe "setup", ->
    it "registers a usage respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci\??$/i)

    it "registers a build respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci build ([-_\.0-9a-zA-Z]+)(\/([-_\+\.a-zA-z0-9\/]+))?/i)

    it "registers a setup respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci setup ([\.\-\/_a-z0-9]+)(\s([\.\-_a-z0-9]+)(\s([\.\-_a-z0-9]+))?)?/i)

    it "registers a toggle respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci toggle ([-_\.0-9a-zA-Z]+)/i)

    it "registers a set room respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci set room ([-_0-9a-zA-Z\.]+) (.*)$/i)

    it "registers a set context respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci set context ([-_0-9a-zA-Z\.]+) (.*)$/i)

    it "registers an unset context respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci unset context ([-_0-9a-zA-Z\.]+)$/i)

    it "registers a rooms respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci rooms$/i)

    it "registers a builds respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci builds ([0-9]+) ?(building)?$/i)

    it "registers a status respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci status( (\*\/[-_\+\.a-zA-z0-9\/]+))?$/i)

    it "registers a repository status respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci status (-v )?([-_\.0-9a-zA-Z]+)(\/([-_\+\.a-zA-z0-9\/]+))?/i)

    it "registers a show respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci show ([-_\.0-9a-zA-Z]+)/i)

    it "registers a delete respond listener", ->
      expect(@robot.respond).to.have.been.calledWith(/ci delete ([-_\.0-9a-zA-Z]+)/i)

    it "registers a post router", ->
      expect(@robot.router.post).to.have.been.calledWith("/janky")

  describe "status", ->
