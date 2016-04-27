'use strict';

let chai = require('chai');
let sinon = require('sinon');
chai.use(require('sinon-chai'));

let expect = chai.expect;

describe("janky", function () {
  let listeners = [
    ["usage", /ci\??$/i],
    ["build", /ci build ([-_\.0-9a-zA-Z]+)(\/([-_\+\.a-zA-z0-9\/]+))?/i],
    ["setup", /ci setup ([\.\-\/_a-z0-9]+)(\s([\.\-_a-z0-9]+)(\s([\.\-_a-z0-9]+))?)?/i],
    ["toggle", /ci toggle ([-_\.0-9a-zA-Z]+)/i],
    ["set room", /ci set room ([-_0-9a-zA-Z\.]+) (.*)$/i],
    ["set context", /ci set context ([-_0-9a-zA-Z\.]+) (.*)$/i],
    ["unset context", /ci unset context ([-_0-9a-zA-Z\.]+)$/i],
    ["rooms", /ci rooms$/i],
    ["builds", /ci builds ([0-9]+) ?(building)?$/i],
    ["status", /ci status( (\*\/[-_\+\.a-zA-z0-9\/]+))?$/i],
    ["repository status", /ci status (-v )?([-_\.0-9a-zA-Z]+)(\/([-_\+\.a-zA-z0-9\/]+))?/i],
    ["show", /ci show ([-_\.0-9a-zA-Z]+)/i],
    ["delete", /ci delete ([-_\.0-9a-zA-Z]+)/i]
  ];
  let routes = [
    ["post", "/janky"]
  ];
  let robot;

  describe("setup", function () {
    beforeEach(function () {
      robot = {
        respond: sinon.spy(),
        hear: sinon.spy(),
        router: {
          post: sinon.spy()
        }
      };

      require('../src/janky')(robot);
    });

    context("listeners", function () {
      for (let listener of listeners) {
        it(`registers the ${listener[0]} listener`, function () {
          expect(robot.respond).to.have.been.calledWith(listener[1]);
        });
      }
    });

    context("routes", function () {
      for (let route of routes) {
        it(`registers the ${route[1]} route`, function () {
          expect(robot.router[route[0]]).to.have.been.calledWith(route[1]);
        });
      }
    });
  });

  describe("without janky URL", function () {
    beforeEach(function () {
      robot = {
        respond: sinon.spy(),
        hear: sinon.spy(),
        router: {
          post: sinon.spy()
        }
      };

      require('../src/janky')(robot);
    });

    for (let listener of listeners) {
      it(`warns from the ${listener[0]} listener`, function() {
        for (let i in robot.respond.args) {
          if (robot.respond.args[i][0].toString() === listener[1].toString()) {
            let msg = {
              send: sinon.spy()
            }
            robot.respond.args[i][1](msg);
            expect(msg.send).to.have.been.calledWith("The `HUBOT_JANKY_URL` environment variable is not set.");
            return;
          }
        }
        assert(false);
      });
    }
  });
});


